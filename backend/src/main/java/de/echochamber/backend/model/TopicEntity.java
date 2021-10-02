package de.echochamber.backend.model;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "TOPICS")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopicEntity {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "topic", fetch = FetchType.EAGER)
    private Set<PollEntity> pollsWithTopic;
}
