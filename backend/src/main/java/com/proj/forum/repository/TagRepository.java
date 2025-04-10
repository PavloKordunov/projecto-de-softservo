package com.proj.forum.repository;

import com.proj.forum.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface  TagRepository extends JpaRepository<Tag, UUID> {
    @Query("""
    SELECT t
    FROM Tag t
    JOIN t.posts p
    GROUP BY t
    ORDER BY COUNT(p) DESC
""")
    List<Tag> findAllOrderByPostCountDesc();

    @Query("""
    SELECT COUNT(p)
    FROM Post p
    JOIN p.tags t
    WHERE t.id = :tagId
""")
    int countPostsByTagId(@Param("tagId") UUID tagId);
}
