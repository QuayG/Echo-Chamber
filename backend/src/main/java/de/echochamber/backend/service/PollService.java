package de.echochamber.backend.service;

import de.echochamber.backend.api.WelcomeInfo;
import de.echochamber.backend.model.AnswerEntity;
import de.echochamber.backend.model.PollEntity;
import de.echochamber.backend.model.TopicEntity;
import de.echochamber.backend.model.UserEntity;
import de.echochamber.backend.repo.PollRepository;
import de.echochamber.backend.repo.TopicRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.springframework.util.Assert.hasText;

@Service
@Getter
public class PollService {
    private final PollRepository pollRepository;
    private final UserService userService;
    private final AnswerService answerService;
    private final TopicRepository topicRepository;

    @Autowired
    public PollService(PollRepository pollRepository, UserService userService, AnswerService answerService, TopicRepository topicRepository) {
        this.pollRepository = pollRepository;
        this.userService = userService;
        this.answerService = answerService;
        this.topicRepository = topicRepository;
    }

    public PollEntity create(PollEntity pollEntity) {

        hasText(pollEntity.getTitle(), "Poll needs a title");
        hasText(pollEntity.getTopic().getName(), "Poll needs a topic");

        if (pollEntity.getPossibleAnswers().size()<2){
            throw new IllegalArgumentException("Poll needs minimum 2 possible answers");
        }

        Optional<PollEntity> pollEntityOptional = pollRepository.findByTitle(pollEntity.getTitle());

        if (pollEntityOptional.isPresent()){
            throw new EntityExistsException("A poll with this title already exists.");
        }
        return pollRepository.save(pollEntity);
    }

    public List<PollEntity> findAll(){

        return pollRepository.findAll();
    }

    public List<TopicEntity> getTopics(){
        return topicRepository.findAll();
    }

    public Set<Optional<PollEntity>> findAllByParticipantsNotContaining(UserEntity userEntity){
        return pollRepository.findAllByParticipantsNotContaining(userEntity);
    }

    public AnswerEntity giveAnswer(AnswerEntity givenAnswerEntity) {

        Optional<PollEntity> pollOpt = pollRepository.findByPossibleAnswersContains(givenAnswerEntity.getChosenAnswer());
        if (pollOpt.isPresent()) {
            PollEntity poll = pollOpt.get();
            poll.getAnswerEntities().add(givenAnswerEntity);
            poll.getParticipants().add(givenAnswerEntity.getUser());
            pollRepository.save(poll);
            return givenAnswerEntity;
        }
        throw new EntityNotFoundException("No poll found for selected answer.");
    }

    public Optional<PollEntity> findById(Long pollId) {
        return pollRepository.findById(pollId);
    }

    public Set<Optional<PollEntity>> findAllByParticipantsContaining(UserEntity userEntity) {
        return pollRepository.findAllByParticipantsContaining(userEntity);
    }

    public PollEntity deletePollById(Long Id){
        Optional<PollEntity> pollToDelete = findById(Id);
        if (pollToDelete.isEmpty()){
            throw new EntityNotFoundException("Poll not found");
        }
        PollEntity deletedPoll = pollToDelete.get();
        pollRepository.delete(deletedPoll);
        return deletedPoll;
    }

    public WelcomeInfo getWelcomeInfo() {
        int numberOfUsers = userService.numberOfUsers();
        int numberOfPolls = pollRepository.findAll().size();
        int numberOfAnswers = answerService.numberOfAnswers();
        return WelcomeInfo.builder()
                .numberOfPolls(numberOfPolls)
                .numberOfUsers(numberOfUsers)
                .numberOfAnswers(numberOfAnswers).build();
    }

    public Optional<TopicEntity> findTopicByName(String name) {
        return topicRepository.findByName(name);
    }
}