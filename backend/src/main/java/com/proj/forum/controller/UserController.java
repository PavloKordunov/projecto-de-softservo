package com.proj.forum.controller;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.dto.UserDto;
import com.proj.forum.entity.User;
import com.proj.forum.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/users")
@CrossOrigin("localhost:3000")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {this.userService = userService;}

    @GetMapping
    public ResponseEntity<List<UserDto>> getUsers() {
        log.info("Fetching all users");
        List<UserDto> groups = userService.getAllUsers();
        if (groups.isEmpty()) {
            log.info("No groups found");
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(groups);
    }

    @PostMapping
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto user) {
        log.info("Create user in controller");
        return ResponseEntity.ok(userService.createUser(user));
    }
}
