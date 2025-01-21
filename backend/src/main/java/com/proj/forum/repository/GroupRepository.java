package com.proj.forum.repository;

import com.proj.forum.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GroupRepository extends JpaRepository<Group, UUID> {
    List<Group> findAll();
    Group findByTitle(String name); //group has title or name?
    Optional<Group> findById(UUID id);
    List<Group> findByTitleContainingIgnoreCase(String name);
}
