package de.echochamber.backend.controller;

import de.echochamber.backend.api.Answer;
import de.echochamber.backend.api.Poll;
import de.echochamber.backend.api.PossibleAnswer;
import de.echochamber.backend.api.User;
import de.echochamber.backend.model.AnswerEntity;
import de.echochamber.backend.model.PollEntity;
import de.echochamber.backend.model.PossibleAnswerEntity;
import de.echochamber.backend.model.UserEntity;
import de.echochamber.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@Service
public class Mapper {

    private final UserService userService;

    @Autowired
    public Mapper(UserService userService) {
        this.userService = userService;
    }

    public PollEntity map(Poll poll) {
        Set<PossibleAnswerEntity> possibleAnswerEntities = new HashSet<>();

        for (int i = 0; i < poll.getPossibleAnswers().size(); i++) {
            PossibleAnswerEntity possibleAnswerEntity = new PossibleAnswerEntity();
            possibleAnswerEntity.setAnswer(poll.getPossibleAnswers().get(i).getPossibleAnswer());
            possibleAnswerEntities.add(possibleAnswerEntity);
        }

        UserEntity userEntity = map(poll.getUser());

        return PollEntity.builder()
                .title(poll.getTitle())
                .possibleAnswers(possibleAnswerEntities)
                .answerEntities(new HashSet<>())
                .participants(new HashSet<>())
                .createdBy(userEntity).build();
    }

    public Poll map(PollEntity pollEntity) {
        Optional<UserEntity> userEntityOptional = userService.findByUserName(pollEntity.getCreatedBy().getUserName());
        if (userEntityOptional.isEmpty()) {
            throw new EntityNotFoundException("User not found");
        }
        User user = map(userEntityOptional.get());

        List<PossibleAnswer> possibleAnswers = new ArrayList<>();
        for (PossibleAnswerEntity possibleAnswerEntity : pollEntity.getPossibleAnswers()) {
            PossibleAnswer possibleAnswer = PossibleAnswer.builder()
                    .possibleAnswer(possibleAnswerEntity.getAnswer())
                    .id(possibleAnswerEntity.getId()).build();
            possibleAnswers.add(possibleAnswer);
        }

        Set<Answer> answers = new HashSet<>();

        for (AnswerEntity answerEntity: pollEntity.getAnswerEntities()) {
            answers.add(map(answerEntity));
        }

        Set<User> participants = new HashSet<>();
        for (UserEntity userEntity: pollEntity.getParticipants()) {
            participants.add(map(userEntity));
        }

        return Poll.builder()
                .title(pollEntity.getTitle())
                .user(user)
                .possibleAnswers(possibleAnswers)
                .givenAnswers(answers)
                .participants(participants).build();
    }

    private UserEntity map(User user) {
        Optional<UserEntity> userEntityOptional = userService.findByUserName(user.getUserName());
        if (userEntityOptional.isPresent()) {
            return userEntityOptional.get();
        }
        throw new EntityNotFoundException("User not found");
    }

    private User map(UserEntity userEntity) {
        return User.builder()
                .userName(userEntity.getUserName())
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName())
                .avatarUrl(userEntity.getAvatarUrl()).build();
    }

    public Answer map(AnswerEntity answerEntity) {
        return Answer.builder()
                .answer(answerEntity.getChosenAnswer().getAnswer())
                .user(map(answerEntity.getUser())).build();
    }

    public List<Poll> map(List<PollEntity> pollEntities) {
        List<Poll> polls = new ArrayList<>();
        for (PollEntity pollEntity : pollEntities) {
            polls.add(map(pollEntity));
        }
        return polls;
    }

    public Set<Poll> mapOpenPolls(Set<PollEntity> pollEntities) {
        Set<Poll> polls = new HashSet<>();
        for (PollEntity pollEntity : pollEntities) {
            polls.add(map(pollEntity));
        }
        return polls;
    }

}
