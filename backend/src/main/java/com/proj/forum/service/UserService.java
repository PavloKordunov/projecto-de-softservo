package com.proj.forum.service;
import com.proj.forum.dto.UserDto;
import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserDto> getAllUsers();
    UUID createUser(UserDto user);
    UserDto getUser(UUID id);
    void deleteUser(UUID id);
    void updateUser(UUID id, UserDto userDto);

}
