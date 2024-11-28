package com.proj.forum.repository;

import com.proj.forum.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {
    List<Tag> findAll();
    Tag findByName(String name);

}
