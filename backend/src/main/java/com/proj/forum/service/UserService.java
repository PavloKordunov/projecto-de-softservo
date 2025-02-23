package com.proj.forum.service;

import com.proj.forum.dto.UserDto;
import com.proj.forum.dto.UserUpdateDto;
import com.proj.forum.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    UUID createUser(UserDto user);
    UUID checkOrCreateUserByGoogle();
    List<UserDto> getAllUsers();
    UserDto getUser(UUID id);
    UserDto getUserByUsername(String username);
    UserDto getUserByEmail(String email);
    void deleteUser(UUID id);
    void updateUser(UUID id, UserUpdateDto userDto);
    List<UserDto> mapToUserDtoList(List<User> users);
    List<UserDto> getByUsernameContain(String name);

    Boolean followUser(UUID userId);
    //boolean isCurrentUser(String email);
}
