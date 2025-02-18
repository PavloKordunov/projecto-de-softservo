package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.annotation.RequireRoles;
import com.proj.forum.dto.*;
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
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/create")
    public ApiResponse<GenericResponse> createUser(@RequestBody @Valid UserRequestDto user) {
        UUID id = userService.createUser(user);
        return ApiResponse.apiResponse(true, 201, "Create user", id);
    }


    @PostMapping("/check")
    public void checkUser() {
        //TODO get user from auth header
        UUID id = userService.createUserByGoogle();
        //return ApiResponse.apiResponse(true, 201, "Create user", id);
    }


    @GetMapping
    public ApiResponse<List<UserRequestDto>> getAllUsers() {
        List<UserRequestDto> usersDto = userService.getAllUsers();
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Users found", usersDto);
    }

    @GetMapping("/id/{id}")
    public ApiResponse<UserResponseDto> getUserById(@PathVariable @Valid UUID id) {
        UserResponseDto userDto = userService.getUser(id);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", userDto);
    }

    @GetMapping("/{username}")
    public ApiResponse<UserResponseDto> getUserByUsername(@PathVariable @Valid String username) {
        UserResponseDto userDto = userService.getUserByUsername(username);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", userDto);
    }

    @GetMapping("email/{email}")
    public ApiResponse<UserResponseDto> getUserByEmail(@PathVariable @Valid String email) {
        var g = userService.getUserByEmail(email);
        return new ApiResponse<>(true, HttpStatus.OK, "Successful getting", g);
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
    @DeleteMapping("/delete/{id}")
    public ApiResponse<GenericResponse> deleteUser(@PathVariable @Valid UUID id) {  //TODO only user can delete/change himself
            userService.deleteUser(id);
            return ApiResponse.apiResponse(true, 200, "User successfully deleted", id);
    }

}
