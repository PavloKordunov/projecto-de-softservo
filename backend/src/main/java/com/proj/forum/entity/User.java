package com.proj.forum.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name ="users")
public class User {
    @Id
    @GeneratedValue
    private UUID id; //utilise @nickname

//    @Column(unique = true, nullable = false)
//    @NotBlank(message = "Username is required")
    private String username;
    private String name;
    private String profileImage;

//   @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true) one user can make many topics
//    private List<Topic> createdTopics;

//    @ManyToMany
//    @JoinTable(
//            name = "user_liked_topics",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "topic_id")   //many users can have many liked topics
//    )
//    private List<Topic> likedTopics;

//    @ManyToMany
//    @JoinTable(
//            name = "user_saved_topics",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "topic_id")  //same as liked
//    )
//private List<Topic> savedTopics;
//     @OneToMany
//     private List<ChatRoom> chatRooms;
    private String image;
}
