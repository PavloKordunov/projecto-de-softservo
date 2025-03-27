package com.proj.forum.repository;


import com.proj.forum.entity.Post;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findAllByGroup_Id(UUID groupId);
    List<Post> findAllByAuthor_Id(UUID authorId);
    List<Post> findByTitleContainingIgnoreCase(String name);

    List<Post> findAllByAuthor_Id(UUID authorId, Sort sort);

    //@Query("SELECT post FROM Post post ORDER BY FUNCTION('RANDOM') LIMIT 1")
    @Query(value = "SELECT * FROM posts OFFSET FLOOR(RANDOM() * (SELECT COUNT(*) FROM posts)) LIMIT 1", nativeQuery = true)
    Optional<Post> findPostByRandom();

}
