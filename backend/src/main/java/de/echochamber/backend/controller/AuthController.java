package de.echochamber.backend.controller;

import de.echochamber.backend.api.AccessToken;
import de.echochamber.backend.api.Credentials;
import de.echochamber.backend.api.User;
import de.echochamber.backend.model.UserEntity;
import de.echochamber.backend.service.JwtService;
import de.echochamber.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static de.echochamber.backend.controller.AuthController.AUTH_TAG;
import static io.jsonwebtoken.lang.Assert.hasText;
import static javax.servlet.http.HttpServletResponse.SC_BAD_REQUEST;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Tag(name = AUTH_TAG, description = "Provides login and principal information")
@Api(
        tags = AUTH_TAG
)
@RestController
public class AuthController {

    public static final String AUTH_TAG = "Auth";
    public static final String ACCESS_TOKEN_URL = "/auth/access_token";

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Operation(summary = "Get logged in authentication principal")
    @GetMapping(value = "/auth/me", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getLoggedInUser(@AuthenticationPrincipal UserEntity userEntity) {
        return ok(
                User.builder()
                        .userName(userEntity.getUserName()).build()
        );
    }

    @Operation(summary = "Create JWT token by credentials")
    @PostMapping(value = ACCESS_TOKEN_URL, produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_BAD_REQUEST, message = "Username or password is blank"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "Invalid credentials")
    })
    public ResponseEntity<AccessToken> getAccessToken(@RequestBody Credentials credentials) {

        try {
            String username = credentials.getUsername();
            hasText(username, "Username must not be blank to get token");
            String password = credentials.getPassword();
            hasText(password, "Password must not be blank to get token");

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);

            authenticationManager.authenticate(authToken);

            UserEntity userEntity = userService.findByUserName(username).orElseThrow();
            String token = jwtService.createJwtToken(userEntity);

            AccessToken accessToken = new AccessToken(token);
            return ok(accessToken);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>(UNAUTHORIZED);
        }
    }
}
