package com.proj.forum.repository;


import com.proj.forum.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TopicRepository extends JpaRepository<Topic, UUID> {
    List<Topic> findByTitleContainingIgnoreCase(String name);
}
