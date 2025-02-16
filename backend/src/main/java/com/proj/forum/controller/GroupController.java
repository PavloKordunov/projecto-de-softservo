package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.annotation.RequireRoles;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.GroupDto;
import com.proj.forum.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

@Logging
@RestController
@RequestMapping("/api/groups")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @RequireRoles({"Everyone"})
    @PostMapping("/create")
    public ApiResponse<GenericResponse> createGroup(@Valid @RequestBody GroupDto group) {
        UUID id = groupService.createGroup(group);
        return ApiResponse.apiResponse(true, 201, "Create group", id);
    }

    @GetMapping
    public ApiResponse<List<GroupDto>> getAllGroups() {
        List<GroupDto> groupsDto = groupService.getAllGroups();
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Groups found", groupsDto);
    }

    @GetMapping("/{id}")
    public ApiResponse<GroupDto> getGroupById(@PathVariable @Valid UUID id) {
        GroupDto groupDto = groupService.getGroup(id);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", groupDto);
    }

    @RequireRoles({"Everyone"})
    @PatchMapping("/update/{id}")
    public ApiResponse<GenericResponse> updateGroup(
            @PathVariable @Valid UUID id,
            @RequestBody @Valid GroupDto groupDto) throws AccessDeniedException {
        groupService.updateGroup(id, groupDto);
        return ApiResponse.apiResponse(true, 200, "Group successfully updated", id);

    }

    @RequireRoles({"Everyone"})
    @PatchMapping("/{groupName}/add/{userId}/")
    public ApiResponse<?> addMember(@PathVariable @Valid String groupName, @PathVariable @Valid UUID userId) {
        UUID groupId = groupService.addMember(userId, groupName);
        return ApiResponse.apiResponse(true, 200, "User successfully subscribed", groupId);
    }

    @RequireRoles({"Everyone"})
    @PatchMapping("/{groupName}/remove/{userId}/")
    public ApiResponse<?> removeMember(@PathVariable @Valid UUID userId, @PathVariable @Valid String groupName) {
        UUID groupId = groupService.removeMember(userId, groupName);
        return ApiResponse.apiResponse(true, 200, "User successfully unsubscribed", groupId);
    }

    @RequireRoles({"Everyone"})
    @DeleteMapping("/delete/{groupId}/user/{userId}")
    public ApiResponse<GenericResponse> deleteGroup(
            @PathVariable @Valid UUID groupId,
            @PathVariable @Valid UUID userId
            ) throws AccessDeniedException {
        groupService.deleteGroup(groupId, userId);
        return ApiResponse.apiResponse(true, 200, "Group successfully deleted", groupId);

    }
}
