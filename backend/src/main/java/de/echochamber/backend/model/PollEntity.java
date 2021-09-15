package de.echochamber.backend.model;

import de.echochamber.backend.api.User;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "POLL")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PollEntity {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "poll_id")
    private Set<AnswerEntity> answerEntities;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "poll_id")
    private Set<PossibleAnswerEntity> possibleAnswers;

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private UserEntity createdBy;

    @ManyToMany
    @JoinTable(name="poll_participants",
            joinColumns={@JoinColumn(name="poll_id")},
            inverseJoinColumns={@JoinColumn(name="user_id")})
    private Set<UserEntity> participants;
}
