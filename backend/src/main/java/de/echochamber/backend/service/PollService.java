package de.echochamber.backend.service;

import de.echochamber.backend.model.AnswerEntity;
import de.echochamber.backend.model.PollEntity;
import de.echochamber.backend.repo.PollRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

import static org.springframework.util.Assert.hasText;

@Service
@Getter
public class PollService {
    private final PollRepository pollRepository;

    @Autowired
    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public PollEntity create(PollEntity pollEntity) {

        hasText(pollEntity.getTitle(), "Poll needs a title");

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
}