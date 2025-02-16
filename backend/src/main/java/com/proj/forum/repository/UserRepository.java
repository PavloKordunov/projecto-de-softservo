package com.proj.forum.repository;

import com.proj.forum.entity.Group;
import com.proj.forum.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface UserRepository extends JpaRepository<User, UUID> { //where use UUID and where username?
    List<User> findByIdIn(Set<UUID> ids);
    Optional<User> findByUsername(String username);
    List<User> findByUsernameContainingIgnoreCase(String name);
    //Set<User> (String email);
}
