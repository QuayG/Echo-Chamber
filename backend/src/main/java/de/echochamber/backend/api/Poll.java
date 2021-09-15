package de.echochamber.backend.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import de.echochamber.backend.model.PossibleAnswerEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Poll {

    @ApiModelProperty(required = true, example = "Do you enjoy polls?", notes = "Poll title")
    private String title;

    @ApiModelProperty(required = true, notes = "Set of possible answers")
    private List<String> possibleAnswers;

    @ApiModelProperty(required = true, notes = "The user who created the poll.")
    private User user;
}