package de.echochamber.backend.repo;

import de.echochamber.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByFirstName(String name);

    Optional<UserEntity> findByFirstNameContains(String name);
}
