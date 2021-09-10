package de.echochamber.backend.controller;

import de.echochamber.backend.api.User;
import de.echochamber.backend.model.UserEntity;
import de.echochamber.backend.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(
        properties = "spring.profiles.active:h2",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class UserControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @AfterEach
    private void clearDb(){
        userService.getUserRepository().deleteAll();
    }

    private String url(){
        return "http://localhost:" + port + "/user/register";
    }

    @Test
    public void successfulRegistering(){
        // Given
        String firstName = "Foo";
        String lastName = "Bar";
        String userName = firstName + lastName;
        String password = "aaa";
        User newUser = User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .userName(userName)
                .password(password).build();

        // When
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<User> httpEntity = new HttpEntity(newUser, headers);
        ResponseEntity<User> response = testRestTemplate
                .exchange(url(), HttpMethod.POST, httpEntity, User.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        User actualUser = response.getBody();
        assertThat(actualUser.getUserName(), is("FooBar"));
        assertThat(actualUser.getFirstName(), is("Foo"));
        assertThat(actualUser.getLastName(), is("Bar"));
        assertThat(actualUser.getRole(), is("user"));

    }
}