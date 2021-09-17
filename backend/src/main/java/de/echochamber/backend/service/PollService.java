package de.echochamber.backend.service;

import de.echochamber.backend.model.AnswerEntity;
import de.echochamber.backend.model.PollEntity;
import de.echochamber.backend.repo.AnswerRepository;
import de.echochamber.backend.repo.PollRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;


@Service
@Getter
public class PollService {
    private final PollRepository pollRepository;
    private final AnswerRepository answerRepository;

    @Autowired
    public PollService(PollRepository pollRepository, AnswerRepository answerRepository) {
        this.pollRepository = pollRepository;
        this.answerRepository = answerRepository;
    }

    public PollEntity create(PollEntity pollEntity) {

        return pollRepository.save(pollEntity);
    }

    public List<PollEntity> findAll(){

        return pollRepository.findAll();
    }

    public AnswerEntity giveAnswer(AnswerEntity givenAnswerEntity) {

        Optional<PollEntity> pollOpt = pollRepository.findByPossibleAnswersContains(givenAnswerEntity.getChosenAnswer());
        if (pollOpt.isPresent()) {
            PollEntity poll = pollOpt.get();
            AnswerEntity answerEntity = answerRepository.saveAndFlush(givenAnswerEntity);
            poll.getAnswerEntities().add(answerEntity);
            poll.getParticipants().add(answerEntity.getUser());
            pollRepository.save(poll);
            return givenAnswerEntity;
        }
        throw new EntityNotFoundException("No poll found for selected answer.");
    }
}