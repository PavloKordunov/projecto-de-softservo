package com.proj.forum.service;

import com.proj.forum.dto.UserDto;
import com.proj.forum.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserDto> getAllUsers();
    UserDto createUser(@RequestBody UserDto userDto);
    UserDto getUser(UUID id);

}
