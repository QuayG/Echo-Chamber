package de.echochamber.backend.controller;

import de.echochamber.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static de.echochamber.backend.controller.UserController.USER_CONTROLLER_TAG;

@Tag(name = USER_CONTROLLER_TAG, description = "Provides CRUD operations for a user")
@Api(
        tags = USER_CONTROLLER_TAG
)
@RestController
@RequestMapping("/user")
@Getter
@Setter
public class UserController {
    public static final String USER_CONTROLLER_TAG = "User";

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

}
