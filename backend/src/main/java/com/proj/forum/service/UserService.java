package com.proj.forum.service;
import com.proj.forum.dto.UserRequestDto;
import com.proj.forum.dto.UserResponseDto;
import com.proj.forum.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserRequestDto> getAllUsers();
    UUID createUser(UserRequestDto user);
    UserResponseDto getUser(UUID id);
    UserResponseDto getUserByUsername(String username);
    void deleteUser(UUID id);
    void updateUser(UUID id, UserRequestDto userDto);
    List<UserRequestDto> mapToUserDtoList(List<User> users);
    List<UserRequestDto> getByUsernameContain(String name);

}
