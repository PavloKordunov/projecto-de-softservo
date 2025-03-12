package com.proj.forum.repository;

import com.proj.forum.entity.Comment;
import com.proj.forum.entity.Post;
import com.proj.forum.entity.PrivacyPolicy;
import com.proj.forum.entity.Topic;
import org.hibernate.annotations.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface PostRepository extends JpaRepository<Post, UUID> { //TODO remove unnecessary methods
    List<Post> findAllByGroup_Id(UUID groupId);
    List<Post> findAllByAuthor_Id(UUID authorId);
    List<Post> findByTitleContainingIgnoreCase(String name);

}
