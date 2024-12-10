package com.proj.forum.entity;

import com.proj.forum.dto.UserDto;
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
    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Name is required")//unique
    private String name;


    private String profileImage;



    @OneToMany(mappedBy = "user", cascade = ALL, orphanRemoval = true) //one user can make many topics
    private List<Topic> createdTopics;



    @ManyToMany
    @JoinTable(
            name = "user_liked_topics",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "topic_id")   //many users can have many liked topics
    )
    private List<Topic> likedTopics;


    @ManyToMany
    @JoinTable(
            name = "user_saved_topics",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "topic_id")   //many users can have many liked topics
    )
    private List<Topic> savedTopics;

    @OneToMany
    @JoinTable(
            name = "user_subscribers",
            joinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> subscribers;


    @OneToMany
    @JoinTable(
            name = "user_following",
            joinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> following;
}
