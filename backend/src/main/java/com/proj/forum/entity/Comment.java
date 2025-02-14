package com.proj.forum.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue
    private UUID id;

    @NotBlank
    private String content;

    private LocalDateTime createdAt;

    @NotNull
    private UUID object; //topic or post

    @NotNull
    private String userImage;

    @NotBlank
    private String nickName;

    @NotBlank
    private String userName;

    @ManyToOne
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment;

    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> replies;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
