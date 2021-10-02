package de.echochamber.backend.controller;

import de.echochamber.backend.api.*;
import de.echochamber.backend.model.*;

import java.util.*;

abstract class Mapper {

    public PollEntity map(Poll poll) {
        Set<PossibleAnswerEntity> possibleAnswerEntities = new HashSet<>();

        for (PossibleAnswer possibleAnswer: poll.getPossibleAnswers()) {
            PossibleAnswerEntity possibleAnswerEntity = new PossibleAnswerEntity();
            possibleAnswerEntity.setAnswer(possibleAnswer.getPossibleAnswer());
            possibleAnswerEntities.add(possibleAnswerEntity);
        }

        return PollEntity.builder()
                .title(poll.getTitle())
                .possibleAnswers(possibleAnswerEntities)
                .answerEntities(new HashSet<>())
                .participants(new HashSet<>()).build();
    }

    public UserEntity map(User user){
        return UserEntity.builder()
                .userName(user.getUserName())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .password(user.getPassword())
                .avatarUrl(user.getAvatarUrl()).build();
    }

    private PossibleAnswer map(PossibleAnswerEntity possibleAnswerEntity){
        return PossibleAnswer.builder()
                .possibleAnswer(possibleAnswerEntity.getAnswer())
                .id(possibleAnswerEntity.getId()).build();
    }

    private Set<Answer> mapAnswers(Set<AnswerEntity> answerEntities){
        Set<Answer> answers = new HashSet<>();
        for (AnswerEntity answerEntity: answerEntities) {
            answers.add(map(answerEntity));
        }
        return answers;
    }

    private Set<User> map (Set<UserEntity> userEntities){
        Set<User> users = new HashSet<>();

        for (UserEntity userEntity: userEntities) {
            users.add(map(userEntity));
        }
        return users;
    }

    public List<Topic> mapTopics(List<TopicEntity> topicEntities){
        List<Topic> topics = new ArrayList<>();
        for (TopicEntity topicEntity: topicEntities) {
            topics.add(Topic.builder()
                    .name(topicEntity.getName()).build());
        }
        return topics;
    }

    public Poll map(PollEntity pollEntity) {

        List<PossibleAnswer> possibleAnswers = new ArrayList<>();
        for (PossibleAnswerEntity possibleAnswerEntity : pollEntity.getPossibleAnswers()) {
            PossibleAnswer possibleAnswer = map(possibleAnswerEntity);
            possibleAnswers.add(possibleAnswer);
        }

        Set<Answer> answers = mapAnswers(pollEntity.getAnswerEntities());
        Set<User> participants = map(pollEntity.getParticipants());
        Topic topic = map(pollEntity.getTopic());
        User creator = map(pollEntity.getCreatedBy());
        return Poll.builder()
                .title(pollEntity.getTitle())
                .topic(topic)
                .creator(creator)
                .possibleAnswers(possibleAnswers)
                .givenAnswers(answers)
                .id(pollEntity.getId())
                .participants(participants).build();
    }

    public Topic map(TopicEntity topicEntity){
        return Topic.builder()
                .name(topicEntity.getName()).build();
    }

    public User map(UserEntity userEntity) {
        return User.builder()
                .userName(userEntity.getUserName())
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName())
                .role(userEntity.getRole())
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

    public Set<Poll> mapPolls(Set<PollEntity> pollEntities) {
        Set<Poll> polls = new HashSet<>();
        for (PollEntity pollEntity : pollEntities) {
            polls.add(map(pollEntity));
        }
        return polls;
    }

}
