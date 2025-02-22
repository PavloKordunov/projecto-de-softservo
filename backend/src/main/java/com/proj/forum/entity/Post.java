package com.proj.forum.entity;


import jakarta.persistence.*;
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
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue
    private UUID id;

    private String title;

    private String description;

    private Integer viewCount;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Lob
    private String image;

    private LocalDateTime createdAt;

    private boolean isPinned;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;
}
