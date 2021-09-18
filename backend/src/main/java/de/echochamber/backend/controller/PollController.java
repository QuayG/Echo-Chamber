package de.echochamber.backend.controller;

import de.echochamber.backend.api.Answer;
import de.echochamber.backend.api.Poll;
import de.echochamber.backend.api.User;
import de.echochamber.backend.model.AnswerEntity;
import de.echochamber.backend.model.PollEntity;
import de.echochamber.backend.model.PossibleAnswerEntity;
import de.echochamber.backend.model.UserEntity;
import de.echochamber.backend.service.AnswerService;
import de.echochamber.backend.service.PollService;
import de.echochamber.backend.service.UserService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.*;

import static javax.servlet.http.HttpServletResponse.SC_BAD_REQUEST;
import static javax.servlet.http.HttpServletResponse.SC_CONFLICT;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/polls")
public class PollController {
    private final PollService pollsService;
    private final UserService userService;
    private final AnswerService answerService;

    @Autowired
    public PollController(PollService pollsService, UserService userService, AnswerService answerService) {
        this.pollsService = pollsService;
        this.userService = userService;
        this.answerService = answerService;
    }

    @PostMapping(value = "/create", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_BAD_REQUEST, message = "Unable to create a poll with blank title"),
            @ApiResponse(code = SC_CONFLICT, message = "Title already exists")
    })
    public ResponseEntity<Poll> createPoll(@RequestBody Poll newPoll) {
        PollEntity pollEntity = map(newPoll);

        PollEntity createdPollEntity = pollsService.create(pollEntity);

        return ok(map(createdPollEntity));
    }

    @PostMapping(value = "/answer/{answerId}")
    public ResponseEntity<Answer> giveAnswer(
            @AuthenticationPrincipal UserEntity authUser,
            @PathVariable Long answerId) {
        PossibleAnswerEntity possibleAnswerEntity = answerService.findPossibleAnswerById(answerId);
        Optional<UserEntity> userEntityOptional = userService.findByUserName(authUser.getUserName());

        if (userEntityOptional.isPresent()) {

            AnswerEntity givenAnswer = AnswerEntity.builder()
                    .chosenAnswer(possibleAnswerEntity)
                    .user(userEntityOptional.get())
                    .build();
            return ok(map(pollsService.giveAnswer(givenAnswer)));
        }
        throw new EntityNotFoundException("User not found");
    }

    @GetMapping
    public ResponseEntity<List<Poll>> findAll() {
        List<PollEntity> pollEntities = pollsService.findAll();
        return ok(map(pollEntities));
    }

    private List<Poll> map(List<PollEntity> pollEntities) {
        List<Poll> polls = new ArrayList<>();
        for (PollEntity pollEntity : pollEntities) {
            polls.add(map(pollEntity));
        }
        return polls;
    }

    private Answer map(AnswerEntity answerEntity) {
        return Answer.builder()
                .answer(answerEntity.getChosenAnswer().getAnswer())
                .user(map(answerEntity.getUser())).build();
    }

    private User map(UserEntity userEntity) {
        return User.builder()
                .userName(userEntity.getUserName())
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName())
                .avatarUrl(userEntity.getAvatarUrl()).build();
    }

    private Poll map(PollEntity pollEntity) {
        User user = User.builder()
                .userName(pollEntity.getCreatedBy().getUserName())
                .firstName(pollEntity.getCreatedBy().getFirstName())
                .lastName(pollEntity.getCreatedBy().getLastName())
                .role(pollEntity.getCreatedBy().getRole())
                .avatarUrl(pollEntity.getCreatedBy().getAvatarUrl()).build();

        List<String> possibleAnswerEntities = pollEntity.getPossibleAnswers().stream().map(answer -> answer.getAnswer()).toList();
        Set<Answer> answers = map(pollEntity.getAnswerEntities());
        return Poll.builder()
                .title(pollEntity.getTitle())
                .user(user)
                .possibleAnswers(possibleAnswerEntities)
                .givenAnswers(answers).build();
    }

    private Set<Answer> map(Set<AnswerEntity> answerEntities) {
        Set<Answer> answers = new HashSet<>();
        for (AnswerEntity answerEntity : answerEntities) {
            Answer answer = Answer.builder()
                    .answer(answerEntity.getChosenAnswer().getAnswer()).build();
            answers.add(answer);
        }
        return answers;
    }

    private PollEntity map(Poll poll) {
        Set<PossibleAnswerEntity> possibleAnswerEntities = new HashSet<>();

        for (int i = 0; i < poll.getPossibleAnswers().size(); i++) {
            PossibleAnswerEntity possibleAnswerEntity = new PossibleAnswerEntity();
            possibleAnswerEntity.setAnswer(poll.getPossibleAnswers().get(i));
            possibleAnswerEntities.add(possibleAnswerEntity);
        }

        UserEntity userEntity = map(poll.getUser());

        return PollEntity.builder()
                .title(poll.getTitle())
                .possibleAnswers(possibleAnswerEntities)
                .answerEntities(new HashSet<>())
                .createdBy(userEntity).build();
    }

    private UserEntity map(User user) {
        Optional<UserEntity> userEntityOptional = userService.findByUserName(user.getUserName());
        if (userEntityOptional.isPresent()) {
            return userEntityOptional.get();
        }
        throw new EntityNotFoundException("User not found");
    }
}


