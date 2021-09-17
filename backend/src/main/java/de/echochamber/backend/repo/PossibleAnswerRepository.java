package de.echochamber.backend.repo;

import de.echochamber.backend.model.PossibleAnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PossibleAnswerRepository extends JpaRepository<PossibleAnswerEntity, Long> {
}
