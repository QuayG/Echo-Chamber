package de.echochamber.backend.api;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Builder
public class PossibleAnswer {

    @ApiModelProperty(required = true)
    private Long id;

    @ApiModelProperty(required = true)
    private String possibleAnswer;
}
