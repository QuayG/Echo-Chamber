package de.echochamber.backend.repo;

import de.echochamber.backend.model.PollEntity;
import de.echochamber.backend.model.PossibleAnswerEntity;
import de.echochamber.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface PollRepository extends JpaRepository<PollEntity, Long> {

    Optional<PollEntity> findByPossibleAnswersContains(PossibleAnswerEntity possibleAnswerEntity);
    Set<Optional<PollEntity>> findAllByParticipantsNotContaining(UserEntity userEntity);
    Set<Optional<PollEntity>> findAllByParticipantsContaining(UserEntity userEntity);
    Optional<PollEntity> findByTitle(String title);
}