package com.proj.forum.repository;

import com.proj.forum.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> { //where use UUID and where username?
    List<User> findByIdIn(Set<UUID> ids);
    Optional<User> findByUsername(String username);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    List<User> findByUsernameContainingIgnoreCase(String name);
    //Set<User> (String email);
}
