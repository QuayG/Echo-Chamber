package de.echochamber.backend.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {

    @ApiModelProperty(required = true, example = "John_Doe", notes = "A users user name")
    private String userName;

    @ApiModelProperty(required = true, example = "John", notes = "A users first name")
    private String firstName;

    @ApiModelProperty(required = true, example = "Doe", notes = "A users last name")
    private String lastName;

    @ApiModelProperty(example = "http://example.com", notes = "The url of the user avatar")
    private String avatarUrl;

    private String role;

    private String password;

}
