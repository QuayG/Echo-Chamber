package de.echochamber.backend.model;

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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "poll_id")
    private Set<AnswerEntity> answerEntities;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "poll_id")
    private Set<PossibleAnswerEntity> possibleAnswers;

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private UserEntity createdBy;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="poll_participants",
            joinColumns={@JoinColumn(name="poll_id")},
            inverseJoinColumns={@JoinColumn(name="user_id")})
    private Set<UserEntity> participants;
}
