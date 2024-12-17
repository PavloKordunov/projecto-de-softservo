package com.proj.forum.controller;

import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.GroupDto;
import com.proj.forum.service.GroupService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
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
    public ApiResponse<GenericResponse> createGroup(@Valid @RequestBody GroupDto group) {
        try {
            log.info("Create group");
            UUID id = groupService.createGroup(group);

            return ApiResponse.apiResponse(true, 201, "Create group", id);
        } catch (EntityNotFoundException ex) {
            log.info("Group is null");
            throw ex;
        }
    }

    @GetMapping
    public ApiResponse<List<GroupDto>> getAllGroups() {
        log.info("Fetching all groups");
        List<GroupDto> groupsDto = groupService.getAllGroups();

        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Groups found", groupsDto);
    }

    @GetMapping("/{id}")
    public ApiResponse<GroupDto> getGroupById(@PathVariable @Valid UUID id) {
        log.info("Fetch group");
        GroupDto groupDto = groupService.getGroup(id);

        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", groupDto);
    }

    @PatchMapping("/update/{id}")
    public ApiResponse<GenericResponse> updateGroup(
            @PathVariable @Valid UUID id,
            @RequestBody @Valid GroupDto groupDto) {
        try {
            log.info("Update group");
            groupService.updateGroup(id, groupDto);
            return ApiResponse.apiResponse(true, 200, "Group successfully updated", id);
        } catch (EntityNotFoundException ex) {
            log.error("No group found [patch]");
            throw ex;
        }
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<GenericResponse> deleteGroup(@PathVariable @Valid UUID id) {
        try {
            log.info("Delete group");
            groupService.deleteGroup(id);
            return ApiResponse.apiResponse(true, 200, "Group successfully deleted", id);
        } catch (EntityNotFoundException ex) {
            log.error("No group found [delete]");
            throw ex;

        }
    }

}
