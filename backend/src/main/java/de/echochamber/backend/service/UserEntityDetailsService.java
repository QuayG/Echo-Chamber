package de.echochamber.backend.service;

import de.echochamber.backend.model.UserEntity;
import de.echochamber.backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserEntityDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserEntityDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException{
        UserEntity userEntity = userRepository
                .findByUserName(userName)
                .orElseThrow(()-> new UsernameNotFoundException("not found: " + userName));

        return User.builder()
                .username(userEntity.getUserName())
                .password(userEntity.getPassword())
                .authorities(userEntity.getRole())
                .build();
    }
}
