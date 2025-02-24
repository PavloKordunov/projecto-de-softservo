package com.proj.forum.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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

    @Lob
    private String image;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> pinnedPosts;

    @NotNull
    private UUID author;

    @ManyToMany
    @JoinTable(
            name = "group_members",
            joinColumns = @JoinColumn(name = "group_id")
    )
    private List<User> members;

    private boolean isPublic;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        isPublic = false;
    }
}
