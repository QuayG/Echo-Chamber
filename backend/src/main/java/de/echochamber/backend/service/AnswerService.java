package de.echochamber.backend.service;

import de.echochamber.backend.model.PossibleAnswerEntity;
import de.echochamber.backend.repo.AnswerRepository;
import de.echochamber.backend.repo.PossibleAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class AnswerService {

    private final PossibleAnswerRepository possibleAnswerRepository;
    private final AnswerRepository answerRepository;

    @Autowired
    public AnswerService(PossibleAnswerRepository possibleAnswerRepository, AnswerRepository answerRepository) {
        this.possibleAnswerRepository = possibleAnswerRepository;
        this.answerRepository = answerRepository;
    }

    public PossibleAnswerEntity findPossibleAnswerById(Long answerId) {
        Optional<PossibleAnswerEntity> selectedAnswer = possibleAnswerRepository.findById(answerId);
        if (selectedAnswer.isPresent()){
        return selectedAnswer.get();
        }
        throw  new EntityNotFoundException("Selected answer not found");
    }

    public int numberOfAnswers() {
        return answerRepository.findAll().size();
    }
}
