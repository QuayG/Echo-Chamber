package de.echochamber.backend.api;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Answer {

    @ApiModelProperty(required = true)
    private User user;

    @ApiModelProperty(required = true, example = "NEIN!", notes = "A given answer")
    private String answer;
}
