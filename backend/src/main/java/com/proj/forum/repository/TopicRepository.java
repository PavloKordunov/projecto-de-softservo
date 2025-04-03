package com.proj.forum.repository;


import com.proj.forum.entity.Topic;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TopicRepository extends JpaRepository<Topic, UUID> {
    List<Topic> findByTitleContainingIgnoreCase(String name);
    List<Topic> findByGenreContainingIgnoreCase(String genre, Sort sort);
    List<Topic> findByGenreContainingIgnoreCase(String genre);
    @Query("""
    SELECT t FROM Topic t
    LEFT JOIN Statistic s ON t.id = s.objectId
    WHERE s.userId = :userId AND s.rate IS NOT NULL
    GROUP BY t.id
""")
    List<Topic> findAllRatedTopicsByUserId(@Param("userId") UUID userId);

    @Query("""
    SELECT t FROM Topic t\s
    JOIN Statistic s ON t.id = s.objectId
    WHERE s.rate IS NOT NULL
    GROUP BY t.id
    ORDER BY ROUND(AVG(s.rate),1) DESC
""")
    List<Topic> getAllByRateDesc();

    @Query("""
    SELECT t FROM Topic t\s
    JOIN Statistic s ON t.id = s.objectId
    WHERE s.rate IS NOT NULL
    GROUP BY t.id
    ORDER BY ROUND(AVG(s.rate),1) ASC\s
""")
    List<Topic> getAllByRateAsc();

    @Query("""
    SELECT t FROM Topic t\s
    JOIN Statistic s ON t.id = s.objectId
    WHERE t.genre LIKE %:genre% AND s.rate IS NOT NULL
    GROUP BY t.id
    ORDER BY ROUND(AVG(s.rate),1) ASC
""")
    List<Topic> getTopicsByGenreAndRateAsc(@Param("genre") String genre);

    @Query("""
    SELECT t FROM Topic t\s
    JOIN Statistic s ON t.id = s.objectId
    WHERE t.genre LIKE %:genre% AND s.rate IS NOT NULL
    GROUP BY t.id
    ORDER BY ROUND(AVG(s.rate),1) DESC
""")
    List<Topic> getTopicsByGenreAndRateDesc(@Param("genre") String genre);

    @Query("""
    SELECT t FROM Topic t\s
    JOIN Statistic s ON t.id = s.objectId
    WHERE t.genre LIKE %:genre% AND s.rate IS NOT NULL
    GROUP BY t.id
    ORDER BY COUNT (s.rate) DESC\s
""")
    List<Topic> getTopicsByGenreAndRateCountDesc(@Param("genre") String genre);

    @Query("""
    SELECT t FROM Topic t\s
    JOIN Statistic s ON t.id = s.objectId
    WHERE t.genre LIKE %:genre% AND s.rate IS NOT NULL
    GROUP BY t.id
    ORDER BY COUNT (s.rate) ASC\s
""")
    List<Topic> getTopicsByGenreAndRateCountAsc(@Param("genre") String genre);

    @Query("""
    SELECT t FROM Topic t\s
    JOIN Statistic s ON t.id = s.objectId
    WHERE s.rate IS NOT NULL
    GROUP BY t.id
    ORDER BY COUNT (s.rate) DESC\s
""")
    List<Topic> getTopicsByRateCountDesc();

    @Query("""
    SELECT t FROM Topic t\s
    JOIN Statistic s ON t.id = s.objectId
    WHERE s.rate IS NOT NULL
    GROUP BY t.id
    ORDER BY COUNT (s.rate) ASC\s
""")
    List<Topic> getTopicsByRateCountAsc();


}


