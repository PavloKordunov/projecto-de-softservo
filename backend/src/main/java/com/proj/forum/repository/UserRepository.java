package com.proj.forum.repository;

import com.proj.forum.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> { //where use UUID and where username?
    List<User> findAll();
    User findByUsername(String username);
    List<User> findByUsernameContainingIgnoreCase(String name);

}
