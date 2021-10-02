package de.echochamber.backend.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Poll {

    @ApiModelProperty(required = true, example = "Do you enjoy polls?", notes = "Poll title")
    private String title;

    @ApiModelProperty(required = true, notes = "Set of possible answers")
    private List<PossibleAnswer> possibleAnswers;

    @ApiModelProperty(required = true, notes = "Set of given answers")
    private Set<Answer> givenAnswers;

    @ApiModelProperty(required = true, notes = "Set of users that participated in the poll.")
    private Set<User> participants;

    @ApiModelProperty(required = true, notes = "The user who created the poll.")
    private User creator;

    @ApiModelProperty(required = true, notes = " Poll id")
    private Long id;

    @ApiModelProperty(required = true, notes = "Poll topic")
    private Topic topic;
}