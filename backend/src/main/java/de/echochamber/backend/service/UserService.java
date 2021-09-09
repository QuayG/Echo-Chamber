package de.echochamber.backend.service;

import de.echochamber.backend.model.UserEntity;
import de.echochamber.backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import java.util.Optional;

import static org.springframework.util.StringUtils.hasText;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<UserEntity> findByUserName(String name){
        return userRepository.findByUserName(name);
    }

    public UserEntity create(UserEntity newUserEntity){
        String userName = newUserEntity.getUserName();
        if (!hasText(userName)){
            throw new IllegalArgumentException("Username must not be blank to register");
        }

        checkUserNameExists(userName);

        String hashedPassword = passwordEncoder.encode(newUserEntity.getPassword());

        return userRepository.save(newUserEntity.toBuilder()
                .password(hashedPassword).build());
    }

    private void checkUserNameExists(String username){
        Optional<UserEntity> userEntityOptional = findByUserName(username);
        if (userEntityOptional.isPresent()){
            throw new EntityExistsException(String.format("User with name=%s already exists", username));
        }
    }
}
