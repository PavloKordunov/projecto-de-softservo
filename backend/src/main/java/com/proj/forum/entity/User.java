package com.proj.forum.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

import static jakarta.persistence.CascadeType.ALL;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name ="users")
public class User {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Email is required")
    private String email;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Nickname is required")
    private String username;

    @NotBlank(message = "Name is required")
    private String name;

    private String profileImage;

    @OneToMany(mappedBy = "author", cascade = ALL, orphanRemoval = true)
    private List<Group> createdGroups;

    @OneToMany(mappedBy = "author", cascade = ALL, orphanRemoval = true)
    private List<Post> createdPosts;

    @ManyToMany
    @JoinTable(
            name = "user_subscribers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "subscriber_id")
    )
    private List<User> subscribers;

    @ManyToMany(mappedBy = "subscribers")
    private List<User> following;

    @ManyToMany(mappedBy = "members")
    private List<Group> groups;
}


