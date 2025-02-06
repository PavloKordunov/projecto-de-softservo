package com.proj.forum.service;
import com.proj.forum.dto.UserDto;
import com.proj.forum.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserDto> getAllUsers();
    UUID createUser(UserDto user);
    UserDto getUser(UUID id);
    UserDto getUserByUsername(String username);
    void deleteUser(UUID id);
    void updateUser(UUID id, UserDto userDto);
    List<UserDto> mapToUserDtoList(List<User> users);
    List<UserDto> getByUsernameContain(String name);

}
