package com.proj.forum.repository;

import com.proj.forum.entity.Comment;
import com.proj.forum.entity.Post;
import com.proj.forum.entity.PrivacyPolicy;
import com.proj.forum.entity.Topic;
import org.hibernate.annotations.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findAllByGroup_Id(UUID groupId);
    List<Post> findAllByAuthor_Id(UUID authorId);
    List<Post> findAll();
    Post findByTitle(String name);
    Optional<Post> findById(UUID id);
    List<Post> findByTitleContainingIgnoreCase(String name);

}
