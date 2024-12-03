package com.proj.forum.controller;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.entity.Group;
import com.proj.forum.service.GroupService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
    public List<Group> getAllGroups() {
        // Mock response data
        List<Group> group = new ArrayList<>();

        group.add(Group.builder()
                .id(UUID.randomUUID())
                .title("Group A")
                .description("Description for Group A")
                .build());

        group.add(Group.builder()
                .id(UUID.randomUUID())
                .title("Group B")
                .description("Description for Group B")
                .build());

        return group;
    };

}
