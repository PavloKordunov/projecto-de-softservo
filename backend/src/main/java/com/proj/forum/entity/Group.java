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
@Table(name = "groups")
public class Group {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true) //group name
    private String title;

    private String description;
    
    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true) //is there a need of args in ()?
    private List<Post> posts;

    private String image;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> pinnedPosts;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
