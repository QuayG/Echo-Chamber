package de.echochamber.backend.controller;

import de.echochamber.backend.api.Answer;
import de.echochamber.backend.api.Poll;
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
public class PollController extends Mapper{
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
    public ResponseEntity<Poll> createPoll(@AuthenticationPrincipal UserEntity authUser, @RequestBody Poll newPoll) {
        PollEntity pollEntity = map(newPoll);
        Optional<UserEntity> creatorOptional = userService.findByUserName(authUser.getUserName());
        if (creatorOptional.isEmpty()){
            throw new EntityNotFoundException("User not found");
        }
        pollEntity.setCreatedBy(creatorOptional.get());
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

    @GetMapping(value ="/all")
    public ResponseEntity<List<Poll>> findAll() {
        List<PollEntity> pollEntities = pollsService.findAll();
        return ok(map(pollEntities));
    }

    @GetMapping(value = "/open")
    public ResponseEntity<Set<Poll>> findOpenPolls(@AuthenticationPrincipal UserEntity authUser){
        Optional<UserEntity> userEntity = userService.findByUserName(authUser.getUserName());
        if (userEntity.isEmpty()){
            throw new EntityNotFoundException("User not found");
        }

        Set<Optional<PollEntity>> openPollsOptional = pollsService.findAllByParticipantsNotContaining(userEntity.get());
        Set<PollEntity> pollEntities = new HashSet<>();
        for (Optional<PollEntity> pollOptional: openPollsOptional) {
            if (pollOptional.isEmpty()){
                throw new EntityNotFoundException("Poll not found");
            }
                pollEntities.add(pollOptional.get());
        }
        return ok(mapOpenPolls(pollEntities));
    }

/*    private UserEntity map(User user) {
        Optional<UserEntity> userEntityOptional = userService.findByUserName(user.getUserName());
        if (userEntityOptional.isPresent()) {
            return userEntityOptional.get();
        }
        throw new EntityNotFoundException("User not found");
    }*/
/*    private Set<User> mapParticipants(Set<UserEntity> participantEntities) {
        Set<User> participants = new HashSet<>();
        for (UserEntity userEntity : participantEntities) {
            participants.add(map(userEntity));
        }
        return participants;
    }*/

/*    private Set<Answer> map(Set<AnswerEntity> answerEntities) {
        Set<Answer> answers = new HashSet<>();
        for (AnswerEntity answerEntity : answerEntities) {
            Answer answer = Answer.builder()
                    .answer(answerEntity.getChosenAnswer().getAnswer()).build();
            answers.add(answer);
        }
        return answers;
    }*/
}


