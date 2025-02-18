package com.proj.forum.service;

import com.proj.forum.dto.UserRequestDto;
import com.proj.forum.dto.UserResponseDto;
import com.proj.forum.dto.UserUpdateDto;
import com.proj.forum.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    UUID createUser(UserRequestDto user);
    UUID createUserByGoogle();
    List<UserRequestDto> getAllUsers();
    UserResponseDto getUser(UUID id);
    UserResponseDto getUserByUsername(String username);
    UserResponseDto getUserByEmail(String email);
    void deleteUser(UUID id);
    void updateUser(UUID id, UserUpdateDto userDto);
    List<UserRequestDto> mapToUserDtoList(List<User> users);
    List<UserRequestDto> getByUsernameContain(String name);
}
