package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.annotation.RequireRoles;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.GroupDto;
import com.proj.forum.dto.ListResponse;
import com.proj.forum.enums.RoleType;
import com.proj.forum.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

@Logging
@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
@CrossOrigin("https://localhost:3000")
public class GroupController {

    private final GroupService groupService;

    @RequireRoles(RoleType.USER)
    @PostMapping("/create")
    public ApiResponse<GenericResponse> createGroup(@Valid @RequestBody GroupDto group) {
        UUID id = groupService.createGroup(group);
        return ApiResponse.apiResponse(true, 201, "Create group", id);
    }

    @GetMapping("/followed/{userId}")
    public ApiResponse<List<GroupDto>> getFollowedGroups(@PathVariable UUID userId) {
        List<GroupDto> groups = groupService.getFollowedGroups(userId);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Groups found", groups);
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

    @GetMapping("/tag/{tagId}")
    public ListResponse<List<GroupDto>> getGroupsByTag(@PathVariable @Valid UUID tagId) {
        List<GroupDto> groupsDto = groupService.getGroupsByTag(tagId);
        return new ListResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", groupsDto.size(), groupsDto);
    }

    @RequireRoles(RoleType.USER)
    @PatchMapping("/update/{id}")
    public ApiResponse<GenericResponse> updateGroup(
            @PathVariable @Valid UUID id,
            @RequestBody @Valid GroupDto groupDto) throws AccessDeniedException {
        groupService.updateGroup(id, groupDto);
        return ApiResponse.apiResponse(true, 200, "Group successfully updated", id);
    }

    @RequireRoles({RoleType.USER})
    @PatchMapping("/{groupName}/follow/{userId}") //TODO test asap
    public ApiResponse<?> addMember(@PathVariable String groupName, @PathVariable UUID userId) {
        boolean isSubscribed = groupService.addMember(userId, groupName);

        return ApiResponse.apiResponse(isSubscribed,
                200,
                isSubscribed ? "User successfully subscribed" : "User successfully unsubscribed",
                null);
    }

    @RequireRoles({RoleType.USER})
    @DeleteMapping("/delete/{groupId}/user/{userId}")
    public ApiResponse<GenericResponse> deleteGroup(
            @PathVariable @Valid UUID groupId,
            @PathVariable @Valid UUID userId
    ) throws AccessDeniedException {
        groupService.deleteGroup(groupId, userId);
        return ApiResponse.apiResponse(true, 200, "Group successfully deleted", groupId);

    }
}
