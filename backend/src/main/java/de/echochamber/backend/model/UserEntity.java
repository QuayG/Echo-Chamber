package de.echochamber.backend.model;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "echo_user")
@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "createdBy", fetch = FetchType.EAGER)
    private Set<PollEntity> pollsCreated;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "password")
    private String password;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "role")
    private String role;
}
