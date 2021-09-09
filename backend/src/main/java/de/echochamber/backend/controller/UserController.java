package de.echochamber.backend.controller;

import de.echochamber.backend.api.User;
import de.echochamber.backend.model.UserEntity;
import de.echochamber.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static de.echochamber.backend.controller.UserController.USER_CONTROLLER_TAG;
import static javax.servlet.http.HttpServletResponse.SC_BAD_REQUEST;
import static javax.servlet.http.HttpServletResponse.SC_CONFLICT;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Tag(name = USER_CONTROLLER_TAG, description = "Provides CRUD operations for a user")
@Api(
        tags = USER_CONTROLLER_TAG
)
@RestController
public class UserController {
    public static final String USER_CONTROLLER_TAG = "User";

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/user/register", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_BAD_REQUEST, message = "Unable to create user with blank username"),
            @ApiResponse(code = SC_CONFLICT, message = "Username is not available. Please change username.")
    })
    public ResponseEntity<User> createUser(@RequestBody User newUser){
        UserEntity userEntity = map(newUser);

        UserEntity createdUserEntity = userService.create(userEntity);

        User createdUser = map(createdUserEntity);

        return ok(createdUser);
    }

    private User map(UserEntity userEntity){
        return User.builder()
                .userName(userEntity.getUserName())
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName())
                .role(userEntity.getRole()).build();
    }

    private UserEntity map(User user){
        return UserEntity.builder()
                .userName(user.getUserName())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .password(user.getPassword()).build();
    }
}
