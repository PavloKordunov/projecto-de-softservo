package com.proj.forum.repository;

import com.proj.forum.entity.Group;
import com.proj.forum.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GroupRepository extends JpaRepository<Group, UUID> {
    Optional<Group> findByTitle(String name); //group has title or name?
    List<Group> findByTitleContainingIgnoreCase(String name);
    List<Group> findByMembersContains(User user);
}
