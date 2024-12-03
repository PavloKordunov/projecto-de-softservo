package com.proj.forum.controller;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.entity.Group;
import com.proj.forum.service.GroupService;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/groups")
@CrossOrigin("http://localhost:3000")
public class GroupController {

    private GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {this.groupService = groupService;}

//    @GetMapping
//    public List<Group> getAllGroups() {
//        log.info("Fetching all groups");
//        return groupService.getAllGroups();
//    };

    @GetMapping
    public ResponseEntity<List<GroupDto>> getAllGroups() {
        try {
            return ResponseEntity.ok(groupService.getAllGroups());
        }
        catch (EntityNotFoundException e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatusCode.valueOf(404), e.getMessage());
        }


    };

}
