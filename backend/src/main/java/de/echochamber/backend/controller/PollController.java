package de.echochamber.backend.controller;

import de.echochamber.backend.api.Poll;
import de.echochamber.backend.api.User;
import de.echochamber.backend.model.PollEntity;
import de.echochamber.backend.model.PossibleAnswerEntity;
import de.echochamber.backend.model.UserEntity;
import de.echochamber.backend.service.PollService;
import de.echochamber.backend.service.UserService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static javax.servlet.http.HttpServletResponse.SC_BAD_REQUEST;
import static javax.servlet.http.HttpServletResponse.SC_CONFLICT;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("polls")
public class PollController {
    private final PollService pollsService;
    private final UserService userService;

    @Autowired
    public PollController(PollService pollsService, UserService userService) {
        this.pollsService = pollsService;
        this.userService = userService;
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

    private Poll map(PollEntity pollEntity){
        User user = User.builder()
                .userName(pollEntity.getCreatedBy().getUserName())
                .firstName(pollEntity.getCreatedBy().getFirstName())
                .lastName(pollEntity.getCreatedBy().getLastName())
                .role(pollEntity.getCreatedBy().getRole())
                .avatarUrl(pollEntity.getCreatedBy().getAvatarUrl()).build();

        List<String> possibleAnswerEntities = pollEntity.getPossibleAnswers().stream().map(answer-> answer.getAnswer()).toList();

        return Poll.builder()
                .title(pollEntity.getTitle())
                .user(user)
                .possibleAnswers(possibleAnswerEntities).build();
    }

    private PollEntity map(Poll poll) {
        Set<PossibleAnswerEntity> possibleAnswerEntities = new HashSet<>();

        for (int i = 0; i < poll.getPossibleAnswers().size(); i++){
            PossibleAnswerEntity possibleAnswerEntity = new PossibleAnswerEntity();
            possibleAnswerEntity.setAnswer(poll.getPossibleAnswers().get(i));

            possibleAnswerEntities.add(possibleAnswerEntity);
        }

        UserEntity userEntity = map(poll.getUser());

        return PollEntity.builder()
                .title(poll.getTitle())
                .possibleAnswers(possibleAnswerEntities)
                .createdBy(userEntity).build();
    }

    private UserEntity map(User user){
        return userService.findByUserName(user.getUserName()).get();
    }
}



