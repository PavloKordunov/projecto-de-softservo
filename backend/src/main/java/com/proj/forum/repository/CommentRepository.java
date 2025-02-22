package com.proj.forum.repository;

import com.proj.forum.entity.Comment;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> getAllByPost_Id(UUID id);
    List<Comment> findCommentsByPost_IdOrderByCreatedAtDesc(UUID postId);
    List<Comment> findCommentsByTopic_IdOrderByCreatedAtDesc(UUID topicId);
}
