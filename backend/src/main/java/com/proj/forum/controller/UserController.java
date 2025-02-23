package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.annotation.RequireRoles;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.UserDto;
import com.proj.forum.dto.UserUpdateDto;
import com.proj.forum.enums.RoleType;
import com.proj.forum.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Logging
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class UserController {

    private final UserService userService;


    @PostMapping("/create")
    public ApiResponse<GenericResponse> createUser(@RequestBody @Valid UserDto user) {
        UUID id = userService.createUser(user);
        return ApiResponse.apiResponse(true, 201, "Create user", id);
    }

    @GetMapping("/check")
    public ApiResponse<GenericResponse> checkUser() {
        UUID id = userService.checkOrCreateUserByGoogle();
        return ApiResponse.apiResponse(true, 201, "Create user", id);
    }

    @GetMapping
    public ApiResponse<List<UserDto>> getAllUsers() {
        List<UserDto> usersDto = userService.getAllUsers();
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Users found", usersDto);
    }

    @GetMapping("/id/{id}")
    public ApiResponse<UserDto> getUserById(@PathVariable UUID id) {
        UserDto userDto = userService.getUser(id);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", userDto);
    }

    @GetMapping("/username/{username}")
    public ApiResponse<UserDto> getUserByUsername(@PathVariable @Valid String username) {
        UserDto userDto = userService.getUserByUsername(username);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", userDto);
    }

    @GetMapping("/email/{email}")
    public ApiResponse<UserDto> getUserByEmail(@PathVariable @Valid String email) {
        UserDto userDto = userService.getUserByEmail(email);
        return new ApiResponse<>(true, HttpStatus.OK, "Successful getting", userDto);
    }

    @RequireRoles({RoleType.USER})
    @PatchMapping("/update/{id}")
    public ApiResponse<GenericResponse> updateUser(
            @PathVariable @Valid UUID id,
            @RequestBody UserUpdateDto userDto) {
            userService.updateUser(id, userDto);
            return ApiResponse.apiResponse(true, 200, "User successfully updated", id);
    }

    @RequireRoles({RoleType.USER})
    @PatchMapping("follow-user/{userId}")
    public ApiResponse<Boolean> followUser(@PathVariable UUID userId) {
        Boolean isFollowing = userService.followUser(userId);
        return new ApiResponse<>(true, HttpStatus.OK, "Successful follow user", isFollowing);
    }

    @RequireRoles({RoleType.USER})
    @DeleteMapping("/delete/{id}")
    public ApiResponse<GenericResponse> deleteUser(@PathVariable UUID id) {  //TODO only user can delete/change himself
            userService.deleteUser(id);
            return ApiResponse.apiResponse(true, 200, "User successfully deleted", id);
    }

}
