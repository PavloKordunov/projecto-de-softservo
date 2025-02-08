package com.proj.forum.controller;

import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.UserRequestDto;
import com.proj.forum.dto.UserResponseDto;
import com.proj.forum.service.UserService;
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
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/create")
    public ApiResponse<GenericResponse> createUser(@RequestBody @Valid UserRequestDto user) {
        try {
            log.info("Create user");
            UUID id = userService.createUser(user);

            return ApiResponse.apiResponse(true, 201, "Create user", id);
        } catch (EntityNotFoundException ex) {
            log.info("User is null");
            throw ex;
        }
    }

    @GetMapping
    public ApiResponse<List<UserRequestDto>> getAllUsers() {
        log.info("Fetching all users");
        List<UserRequestDto> usersDto = userService.getAllUsers();

        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Users found", usersDto);
    }

    @GetMapping("/id/{id}")
    public ApiResponse<UserResponseDto> getUserById(@PathVariable @Valid UUID id) {

        log.info("Fetch user");
        UserResponseDto userDto = userService.getUser(id);

        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", userDto);
    }

    @GetMapping("/{username}")
    public ApiResponse<UserResponseDto> getUserByUsername(@PathVariable @Valid String username) {

        log.info("Fetch user by username");
        UserResponseDto userDto = userService.getUserByUsername(username);

        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", userDto);
    }

    @PatchMapping("/update/{id}")
    public ApiResponse<GenericResponse> updateUser(
            @PathVariable @Valid UUID id,
            @RequestBody UserRequestDto userDto) {
        try {
            log.info("Update user");
            userService.updateUser(id, userDto);
            return ApiResponse.apiResponse(true, 200, "User successfully updated", id);
        } catch (EntityNotFoundException ex) {
            log.error("No user found [patch]");
            throw ex;
        }
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<GenericResponse> deleteUser(@PathVariable @Valid UUID id) {
        try {
            log.info("Delete user");
            userService.deleteUser(id);
            return ApiResponse.apiResponse(true, 200, "User successfully deleted", id);
        } catch (EntityNotFoundException ex) {
            log.error("No user found [delete]");
            throw ex;
        }
    }

}
