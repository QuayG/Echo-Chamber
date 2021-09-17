package de.echochamber.backend.repo;

import de.echochamber.backend.model.PollEntity;
import de.echochamber.backend.model.PossibleAnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PollRepository extends JpaRepository<PollEntity, Long> {

    Optional<PollEntity> findByPossibleAnswersContains(PossibleAnswerEntity possibleAnswerEntity);
}