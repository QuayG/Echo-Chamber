package de.echochamber.backend.repo;

import de.echochamber.backend.api.Poll;
import de.echochamber.backend.model.PollEntity;
import de.echochamber.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PollRepository extends JpaRepository<PollEntity, Long> {

    List<PollEntity> findAllByParticipantsContaining(UserEntity user);
    List<PollEntity> findAllByParticipantsNotContaining(UserEntity user);
}