package de.echochamber.backend.controller;

import de.echochamber.backend.api.Answer;
import de.echochamber.backend.api.Poll;
import de.echochamber.backend.api.User;
import de.echochamber.backend.config.JwtConfig;
import de.echochamber.backend.model.AnswerEntity;
import de.echochamber.backend.model.PollEntity;
import de.echochamber.backend.model.PossibleAnswerEntity;
import de.echochamber.backend.model.UserEntity;
import de.echochamber.backend.repo.PollRepository;
import de.echochamber.backend.repo.PossibleAnswerRepository;
import de.echochamber.backend.repo.UserRepository;
import de.echochamber.backend.service.PollService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;

import java.time.Duration;
import java.time.Instant;
import java.util.*;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(
        properties = "spring.profiles.active:h2",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PollControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private PollService pollService;

    @Autowired
    private JwtConfig jwtConfig;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private PossibleAnswerRepository possibleAnswerRepository;

    @BeforeEach
    public void someData() {
        UserEntity testUser = userRepository.saveAndFlush(UserEntity.builder()
                .userName("TestUser")
                .firstName("Test")
                .lastName("User")
                .role("user").build());

        userRepository.saveAndFlush(testUser);

        String title = "Is the banana crooked?";

        PossibleAnswerEntity first = PossibleAnswerEntity.builder()
                .id(1L)
                .answer("Yes!").build();

        PossibleAnswerEntity second = PossibleAnswerEntity.builder()
                .id(2L)
                .answer("No!").build();
        Set<PossibleAnswerEntity> basePossibleAnswerEntities = new HashSet<>();
        basePossibleAnswerEntities.add(first);
        basePossibleAnswerEntities.add(second);

        Set<AnswerEntity> baseAnswerEntities = new HashSet<>();

        pollRepository.saveAndFlush(PollEntity.builder()
                .id(1L)
                .title(title)
                .possibleAnswers(basePossibleAnswerEntities)
                .answerEntities(baseAnswerEntities)
                .createdBy(testUser)
                .build());
    }

    @AfterEach
    private void clearDb() {
        pollRepository.deleteAll();
        userRepository.deleteAll();
    }

    private String getUrl() {
        return "http://localhost:" + port + "/polls/";
    }

    @Test
    @DisplayName("The create method should persist and return a new poll")
    public void createNewPollTest() {
        // Given
        List<String> possibleAnswerEntities = new ArrayList<>();
        possibleAnswerEntities.add("Sure!");
        possibleAnswerEntities.add("Who doesn't?");

        Set<Answer> answers = new HashSet<>();

        User user = User.builder()
                .userName("TestUser")
                .role("user").build();

        Poll poll = Poll.builder()
                .title("Do you like polls?")
                .user(user)
                .possibleAnswers(possibleAnswerEntities)
                .givenAnswers(answers).build();

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "user");

        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterMinutes())));

        String token = Jwts.builder()
                .setSubject("Peter")
                .setClaims(claims)
                .setIssuedAt(iat)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret()).compact();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // When
        ResponseEntity<Poll> response = testRestTemplate.exchange(getUrl() + "create", HttpMethod.POST, new HttpEntity<>(poll, headers), Poll.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getTitle(), is("Do you like polls?"));
        assertThat(response.getBody().getPossibleAnswers().size(), is(2));
        assertThat(response.getBody().getUser().getUserName(), is("TestUser"));
        assertTrue(response.getBody().getGivenAnswers().isEmpty());
    }

    @Test
    @DisplayName("Creating a poll with a title that already exists should return HttpStatus.CONFLICT")
    public void createPollWithExistingTitleTest() {
        // Given
        String title = "Is the banana crooked?";
        List<String> possibleAnswers = new ArrayList<>();
        possibleAnswers.add("Yes!");
        possibleAnswers.add("No!");

        User user = User.builder()
                .userName("TestUser").build();

        Poll poll = Poll.builder()
                .user(user)
                .possibleAnswers(possibleAnswers)
                .title(title)
                .build();

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "user");

        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterMinutes())));

        String token = Jwts.builder()
                .setSubject("TestUser")
                .setClaims(claims)
                .setIssuedAt(iat)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret()).compact();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // When
        ResponseEntity<Poll> response = testRestTemplate.exchange(getUrl() + "create", HttpMethod.POST, new HttpEntity<>(poll, headers), Poll.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.CONFLICT));

    }

    @Test
    @DisplayName("Creating a poll without a title should return HttpStatus.BAD_REQUEST")
    public void creatingPollWithoutTitleTest(){
        // Given
        String title = "";

        List<String> possibleAnswers = new ArrayList<>();
        possibleAnswers.add("Yes!");
        possibleAnswers.add("No!");

        User user = User.builder()
                .userName("TestUser").build();

        Poll poll = Poll.builder()
                .user(user)
                .title(title)
                .possibleAnswers(possibleAnswers).build();

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "user");

        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterMinutes())));

        String token = Jwts.builder()
                .setSubject("TestUser")
                .setClaims(claims)
                .setIssuedAt(iat)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret()).compact();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // When
        ResponseEntity<Poll> response = testRestTemplate.exchange(getUrl() + "create", HttpMethod.POST, new HttpEntity<>(poll, headers), Poll.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }

    @Test
    @DisplayName("Creating a poll with less than 2 possible answers should return HttpStatus.BAD_REQUEST")
    public void creatingPollWithLessThen2PossibleAnswersTest(){
        // Given
        String title = "Do you like polls";

        List<String> possibleAnswers = new ArrayList<>();
        possibleAnswers.add("Yes!");

        User user = User.builder()
                .userName("TestUser").build();

        Poll poll = Poll.builder()
                .user(user)
                .title(title)
                .possibleAnswers(possibleAnswers).build();

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "user");

        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterMinutes())));

        String token = Jwts.builder()
                .setSubject("TestUser")
                .setClaims(claims)
                .setIssuedAt(iat)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret()).compact();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // When
        ResponseEntity<Poll> response = testRestTemplate.exchange(getUrl() + "create", HttpMethod.POST, new HttpEntity<>(poll, headers), Poll.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }
}