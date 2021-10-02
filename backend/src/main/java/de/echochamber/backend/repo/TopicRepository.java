package de.echochamber.backend.repo;

import de.echochamber.backend.api.Topic;
import de.echochamber.backend.model.TopicEntity;
import de.echochamber.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TopicRepository extends JpaRepository<TopicEntity, Long> {
    Optional<TopicEntity> findByName(String name);
}
