package de.echochamber.backend.controller;

import de.echochamber.backend.api.AccessToken;
import de.echochamber.backend.api.Credentials;
import de.echochamber.backend.config.JwtConfig;
import de.echochamber.backend.model.UserEntity;
import de.echochamber.backend.repo.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.function.DoubleToLongFunction;

import static de.echochamber.backend.controller.AuthController.ACCESS_TOKEN_URL;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(
        properties = "spring.profiles.active:h2",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class AuthControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtConfig jwtConfig;

    private String url(){
        return "http://localhost:" + port + ACCESS_TOKEN_URL;
    }

    @AfterEach
    public void clearDb(){
        userRepository.deleteAll();
    }

    @Test
    public void successfulLogin(){
        // Given
        String firstName = "Foo";
        String lastName = "Bar";
        String username = firstName + lastName;
        String password = "aaa";
        String role = "user";
        String hashedPassword = passwordEncoder.encode(password);
        userRepository.saveAndFlush(
                UserEntity.builder()
                        .firstName(firstName)
                        .lastName(lastName)
                        .userName(username)
                        .role(role)
                        .password(hashedPassword).build()
        );

        Credentials credentials = Credentials.builder()
                .username(username)
                .password(password).build();

        // When
        ResponseEntity<AccessToken> response = testRestTemplate
                .postForEntity(url(), credentials, AccessToken.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertNotNull(response.getBody());

        String token = response.getBody().getToken();
        Claims claims = Jwts.parser().setSigningKey(jwtConfig.getSecret())
                .parseClaimsJws(token).getBody();
        assertThat(claims.getSubject(), is(username));
        assertThat(claims.get("role", String.class), is(role));
    }

    @Test
    public void badCredentials(){
        // Given

        Credentials credentials = Credentials.builder()
                .username("Foo")
                .password("lalelu").build();

        // When
        HttpEntity<Credentials> httpEntity = new HttpEntity<>(credentials,getHttpHeaders());
        ResponseEntity<AccessToken> response = testRestTemplate
                .postForEntity(url(), credentials, AccessToken.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.UNAUTHORIZED));
        assertThat(response.getBody(), nullValue());
    }

    private HttpHeaders getHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    @Test
    public void noCredentials(){
        // Given
        Credentials credentials = new Credentials();

        // When
        HttpEntity<Credentials> httpEntity = new HttpEntity<>(credentials, getHttpHeaders());
        ResponseEntity<AccessToken> response = testRestTemplate
                .postForEntity(url(), httpEntity, AccessToken.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }
}