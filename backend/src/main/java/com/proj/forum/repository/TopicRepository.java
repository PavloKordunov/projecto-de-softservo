package com.proj.forum.repository;


import com.proj.forum.entity.Post;
import com.proj.forum.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TopicRepository extends JpaRepository<Topic, UUID> {
    List<Topic> findByTitleContainingIgnoreCase(String name);

    @Query("""
    SELECT t FROM Topic t
    LEFT JOIN Statistic s ON t.id = s.objectId
    WHERE s.userId = :userId AND s.rate IS NOT NULL
    GROUP BY t.id
""")
    List<Topic> findAllRatedTopicsByUserId(@Param("userId") UUID userId);
}
