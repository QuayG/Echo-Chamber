package de.echochamber.backend.controller;

import de.echochamber.backend.api.*;
import de.echochamber.backend.config.JwtConfig;
import de.echochamber.backend.model.*;
import de.echochamber.backend.repo.PollRepository;
import de.echochamber.backend.repo.TopicRepository;
import de.echochamber.backend.repo.UserRepository;
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
    private JwtConfig jwtConfig;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private TopicRepository topicRepository;

    @BeforeEach
    public void someData() {
        UserEntity testUser = userRepository.saveAndFlush(UserEntity.builder()
                .userName("TestUser")
                .firstName("Test")
                .lastName("User")
                .role("user").build());

        TopicEntity topicEntity = TopicEntity.builder()
                .name("IT").build();

        topicRepository.save(topicEntity);

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
    public void clearDb() {
        pollRepository.deleteAll();
        userRepository.deleteAll();
        topicRepository.deleteAll();
    }

    private String getUrl() {
        return "http://localhost:" + port + "/polls";
    }

    @Test
    @DisplayName("The create method should persist and return a new poll")
    public void createNewPollTest() {
        // Given
        List<PossibleAnswer> possibleAnswers = new ArrayList<>();
        PossibleAnswer first = PossibleAnswer.builder()
                .possibleAnswer("Sure!").build();
        PossibleAnswer second = PossibleAnswer.builder()
                .possibleAnswer("Who doesn't").build();

        possibleAnswers.add(first);
        possibleAnswers.add(second);

        Set<Answer> answers = new HashSet<>();

        Topic topic = Topic.builder()
                .name("IT").build();

        User user = User.builder()
                .userName("TestUser")
                .role("user").build();

        Poll poll = Poll.builder()
                .title("Do you like polls?")
                .creator(user)
                .possibleAnswers(possibleAnswers)
                .topic(topic)
                .givenAnswers(answers).build();

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "user");

        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterMinutes())));

        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject("TestUser")
                .setIssuedAt(iat)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret()).compact();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // When
        ResponseEntity<Poll> response = testRestTemplate.exchange(getUrl(), HttpMethod.POST, new HttpEntity<>(poll, headers), Poll.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getTitle(), is("Do you like polls?"));
        assertThat(response.getBody().getPossibleAnswers().size(), is(2));
        assertThat(response.getBody().getCreator().getUserName(), is("TestUser"));
        assertTrue(response.getBody().getGivenAnswers().isEmpty());
    }

    @Test
    @DisplayName("Creating a poll with a title that already exists should return HttpStatus.CONFLICT")
    public void createPollWithExistingTitleTest() {
        // Given
        String title = "Is the banana crooked?";
        List<PossibleAnswer> possibleAnswers = new ArrayList<>();
        PossibleAnswer first = PossibleAnswer.builder()
                .possibleAnswer("Yes!").build();
        PossibleAnswer second = PossibleAnswer.builder()
                .possibleAnswer("No!").build();
        possibleAnswers.add(first);
        possibleAnswers.add(second);

        User user = User.builder()
                .userName("TestUser").build();

        Topic topic = Topic.builder()
                .name("IT").build();

        Poll poll = Poll.builder()
                .creator(user)
                .possibleAnswers(possibleAnswers)
                .topic(topic)
                .title(title)
                .build();

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "user");

        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterMinutes())));

        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject("TestUser")
                .setIssuedAt(iat)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret()).compact();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // When
        ResponseEntity<Poll> response = testRestTemplate.exchange(getUrl(), HttpMethod.POST, new HttpEntity<>(poll, headers), Poll.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.CONFLICT));

    }

    @Test
    @DisplayName("Creating a poll without a title should return HttpStatus.BAD_REQUEST")
    public void creatingPollWithoutTitleTest(){
        // Given
        String title = "";

        List<PossibleAnswer> possibleAnswers = new ArrayList<>();
        PossibleAnswer first = PossibleAnswer.builder()
                .possibleAnswer("Yes!").build();
        PossibleAnswer second = PossibleAnswer.builder()
                .possibleAnswer("No!").build();
        possibleAnswers.add(first);
        possibleAnswers.add(second);

        User user = User.builder()
                .userName("TestUser").build();

        Topic topic = Topic.builder()
                .name("IT").build();

        Poll poll = Poll.builder()
                .creator(user)
                .topic(topic)
                .title(title)
                .possibleAnswers(possibleAnswers).build();

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "user");

        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterMinutes())));

        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject("TestUser")
                .setIssuedAt(iat)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret()).compact();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // When
        ResponseEntity<Poll> response = testRestTemplate.exchange(getUrl(), HttpMethod.POST, new HttpEntity<>(poll, headers), Poll.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }

    @Test
    @DisplayName("Creating a poll with less than 2 possible answers should return HttpStatus.BAD_REQUEST")
    public void creatingPollWithLessThen2PossibleAnswersTest(){
        // Given
        String title = "Do you like polls";

        List<PossibleAnswer> possibleAnswers = new ArrayList<>();
        PossibleAnswer first = PossibleAnswer.builder()
                .possibleAnswer("Yes!").build();
        possibleAnswers.add(first);

        User user = User.builder()
                .userName("TestUser").build();

        Topic topic = Topic.builder()
                .name("IT").build();

        Poll poll = Poll.builder()
                .creator(user)
                .topic(topic)
                .title(title)
                .possibleAnswers(possibleAnswers).build();

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "user");

        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterMinutes())));

        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject("TestUser")
                .setIssuedAt(iat)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret()).compact();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // When
        ResponseEntity<Poll> response = testRestTemplate.exchange(getUrl(), HttpMethod.POST, new HttpEntity<>(poll, headers), Poll.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }
}