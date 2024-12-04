package com.proj.forum.controller;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.service.GroupService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/groups")
@CrossOrigin("http://localhost:3000")
public class GroupController {

    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {this.groupService = groupService;}

    @PostMapping
    public GroupDto createGroups(@RequestBody GroupDto group)
    {
        log.info("Create group");
        return groupService.createGroup(group);
    }

    @GetMapping
    public List<GroupDto> getAllGroups()
    {
        log.info("Fetching all groups");
        return groupService.getAllGroups();
    }



}
