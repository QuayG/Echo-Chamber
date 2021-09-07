package de.echochamber.backend.filter;

import de.echochamber.backend.SpringTestContextConfiguration;
import de.echochamber.backend.api.User;
import de.echochamber.backend.config.JwtConfig;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.ContextConfiguration;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(
        properties = "spring.profiles.active:h2",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
public class JwtAuthFilterTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private JwtConfig jwtConfig;

    private String url(){
        return "http://localhost:" + port + "/auth/me";
    }

    @Test
    @DisplayName("A request with a valid JWT should be accepted.")
    public void validJwtTest(){
        // Given
        String username = "Foo";
        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterMinutes())));
        String token = Jwts.builder()
                .setClaims(new HashMap<>(
                        Map.of("role", "USER")
                ))
                .setIssuedAt(iat)
                .setExpiration(exp)
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret()).compact();

        // When
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);
        ResponseEntity<User> response = testRestTemplate
                .exchange(url(), HttpMethod.GET, new HttpEntity<>(headers), User.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertNotNull(response.getBody());
    }

    @Test
    @DisplayName("Token signed with wrong secret should be rejected.")
    public void invalidSignedJwtTest(){
        // Given
        String username = "Foo";
        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterMinutes())));
        String wrongSecret = jwtConfig.getSecret() + "invalid";
        String token = Jwts.builder()
                .setClaims(new HashMap<>(
                        Map.of("role", "USER")
                ))
                .setIssuedAt(iat)
                .setExpiration(exp)
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS256, wrongSecret).compact();

        // When
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);
        ResponseEntity<User> response = testRestTemplate
                .exchange(url(), HttpMethod.GET, new HttpEntity<>(headers), User.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }

    @Test
    @DisplayName("Requests with expired token should be rejected.")
    public void expiredJwtTest(){
        // Given
        String username = "Foo";
        Instant now = Instant.now().minus(Duration.ofMinutes(jwtConfig.getExpiresAfterMinutes() * 2));
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterMinutes())));
        String token = Jwts.builder()
                .setClaims(new HashMap<>(
                        Map.of("role", "USER")
                ))
                .setIssuedAt(iat)
                .setExpiration(exp)
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret()).compact();

        // When
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        ResponseEntity<User> response = testRestTemplate
                .exchange(url(), HttpMethod.GET, new HttpEntity<>(headers), User.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));

    }
}
