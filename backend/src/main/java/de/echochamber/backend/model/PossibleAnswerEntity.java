package de.echochamber.backend.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "POSSIBLE_ANSWER")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PossibleAnswerEntity {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "possible_answer", nullable = false)
    private String answer;
}