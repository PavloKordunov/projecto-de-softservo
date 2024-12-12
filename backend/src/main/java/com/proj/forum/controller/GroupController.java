package com.proj.forum.controller;

import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.GroupDto;
import com.proj.forum.exception.CustomNullPointerException;
import com.proj.forum.exception.CustomResourseNotFoundException;
import com.proj.forum.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    public ApiResponse<GenericResponse> createGroup(@RequestBody @Valid GroupDto group) {
        try {
            log.info("Create group");
            UUID id = groupService.createGroup(group);

            return apiResponse(true, 201, "Create group", id);
        } catch (CustomNullPointerException ex) {
            log.info("Group is null");
            throw ex;
        }
    }

    @GetMapping
    public ApiResponse<List<GroupDto>> getAllGroups() {
        log.info("Fetching all groups");
        List<GroupDto> groupsDto = groupService.getAllGroups();
        //        if (groups.isEmpty()) {
//            log.info("No groups found");
//            return new ApiResponse<>(false, HttpStatus.NOT_FOUND, "Groups didn't find", null);
//        }
        return new ApiResponse<>(true, HttpStatus.OK, "Groups found", groupsDto);
    }

    @GetMapping("/{id}")
    public ApiResponse<GroupDto> getGroupById(@PathVariable @Valid UUID id) {
        try {
            log.info("Fetch group");
            GroupDto groupDto = groupService.getGroup(id);
            return new ApiResponse<>(true, HttpStatus.OK, "Successful getting", groupDto);
        } catch (CustomResourseNotFoundException ex) {
            log.error("No group found [getById]");
            throw ex;
        }
    }

    @PatchMapping("/update/{id}")
    public ApiResponse<GenericResponse> updateGroup(
            @PathVariable @Valid UUID id,
            @RequestBody @Valid String title) {
        try {
            log.info("Update group");
            groupService.updateGroup(id, title);
            return apiResponse(true, 200, "Group successfully updated", id);
        } catch (CustomResourseNotFoundException ex) {
            log.error("No group found [patch]");
            throw ex;
        }
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<GenericResponse> deleteGroup(@PathVariable @Valid UUID id) {
        try {
            log.info("Delete group");
            groupService.deleteGroup(id);
            return apiResponse(true, 200, "Group successfully deleted", id);
        } catch (CustomResourseNotFoundException ex) {
            log.error("No group found [delete]");
            throw ex;
        }
    }

    private static ApiResponse<GenericResponse> apiResponse(
            boolean success, int statusCode, String message, UUID id) {
        return new ApiResponse<>(success, HttpStatusCode.valueOf(statusCode), message, new GenericResponse(id));
    }
}
