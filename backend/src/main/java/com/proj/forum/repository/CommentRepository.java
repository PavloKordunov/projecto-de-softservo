package com.proj.forum.repository;

import com.proj.forum.entity.Comment;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> getAllByPost_Id(UUID id);
    List<Comment> findAllByPostIdOrderByCreatedAtDesc(UUID postId);
    List<Comment> findAllByTopicIdOrderByCreatedAtDesc(UUID topicId);
}
