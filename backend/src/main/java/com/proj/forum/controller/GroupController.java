package com.proj.forum.controller;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.service.GroupService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/groups")
@CrossOrigin("http://localhost:3000")
public class GroupController {

    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping
    public ResponseEntity<GroupDto> createGroup(@RequestBody GroupDto group) {
        log.info("Create group in controller");
        return ResponseEntity.ok(groupService.createGroup(group));
    }

    @GetMapping
    public ResponseEntity<List<GroupDto>> getAllGroups() {
        log.info("Fetching all groups");
        List<GroupDto> groups = groupService.getAllGroups();
        if (groups.isEmpty()) {
            log.info("No groups found");
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(groups);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupDto> getGroup(@PathVariable UUID id){
        log.info("Fetch group");
        if(id == null) {
            log.info("No group found");
            return ResponseEntity.noContent().build();
        }
        GroupDto groupDto = groupService.getGroup(id);
        if(groupDto == null)
        {
            log.info("No group found");
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(groupDto);
    }

}
