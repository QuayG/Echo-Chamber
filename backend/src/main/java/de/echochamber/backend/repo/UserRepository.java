package de.echochamber.backend.repo;

import de.echochamber.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByFirstName(String firstName);

    Optional<UserEntity> findByFirstNameContains(String firstName);

    Optional<UserEntity> findByLastName(String lastName);

    Optional<UserEntity> findByLastNameContains(String lastName);

    Optional<UserEntity> findByUserName(String userName);

    Optional<UserEntity> findByUserNameContains(String userName);
}
