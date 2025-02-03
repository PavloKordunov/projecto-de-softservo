package com.proj.forum.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;
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

    @ManyToOne
    @JoinColumn(name = "group_title", nullable = false)
    private Group group;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    private String image;

    private LocalDateTime createdDate;

    private boolean isPinned;
}
