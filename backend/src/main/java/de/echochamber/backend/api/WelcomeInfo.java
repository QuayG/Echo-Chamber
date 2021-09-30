package de.echochamber.backend.api;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WelcomeInfo {

    @ApiModelProperty(required = true)
    private int numberOfUsers;

    @ApiModelProperty(required = true)
    private int numberOfPolls;

    @ApiModelProperty(required = true)
    private int numberOfAnswers;

}
