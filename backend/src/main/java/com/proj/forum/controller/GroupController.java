package com.proj.forum.controller;

import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.GroupDto;
import com.proj.forum.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/groups")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping("/create")
    public ApiResponse<GenericResponse> createGroup(@RequestBody GroupDto group) {
        try {
            log.info("Create group");
            UUID id = groupService.createGroup(group);

            return apiResponse(true, 201, "Create group", id);
        } catch (Exception e) {
            return new ApiResponse<>(false, HttpStatus.BAD_REQUEST, "Argument don't correct", new GenericResponse("Group isn't exist"));
        }

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
    public ResponseEntity<GroupDto> getGroupById(@Valid @PathVariable UUID id) {
        log.info("Fetch group");
        GroupDto groupDto = groupService.getGroup(id);
        if (groupDto == null) {
            log.info("No group found");
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(groupDto);
    }

    @PatchMapping("/update/{id}")
    public ApiResponse<GenericResponse> updateGroup(@Valid @PathVariable UUID id, @Valid @RequestBody String title) {
        try {
            log.info("Update group");
            groupService.updateGroup(id, title);
            return apiResponse(true, 200, "Group successfully updated", id);
        } catch (Exception e) {
            return apiResponse(false, 404, "Group wasn't updated", id);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<GenericResponse> deleteGroup(@Valid @PathVariable UUID id) {
        try {
            log.info("Delete group");
            groupService.deleteGroup(id);
            return apiResponse(true, 200, "Group successfully deleted", id);
        } catch (Exception e) {
            return apiResponse(false, 400, "Group wasn't delete", id);
        }

    }

    private static ApiResponse<GenericResponse> apiResponse(boolean success, int statusCode, String message, UUID id) {
        return new ApiResponse<>(success, HttpStatusCode.valueOf(statusCode), message, new GenericResponse(id));
    }
}
