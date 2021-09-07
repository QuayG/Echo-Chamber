package de.echochamber.backend.model;


import de.echochamber.backend.SpringBootTests;
import de.echochamber.backend.repo.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class UserEntityTest extends SpringBootTests {

    @Resource
    private UserRepository userRepository;

    @Test
    @DisplayName("The findByUserName method should return the user if it exists.")
    @Transactional
    public void testFindByUserNameExistingUser(){
        // Given
        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName("Foo");
        userEntity.setLastName("Bar");
        userEntity.setPassword("aaa");
        userEntity.setUserName(userEntity.getFirstName() + userEntity.getLastName());
        UserEntity expectedUser = userRepository.save(userEntity);

        // When
        Optional<UserEntity> actualUserOptional = userRepository.findByUserName("FooBar");
        assertTrue(actualUserOptional.isPresent());

        // Then
        assertEquals(expectedUser, actualUserOptional.get());
    }
}
