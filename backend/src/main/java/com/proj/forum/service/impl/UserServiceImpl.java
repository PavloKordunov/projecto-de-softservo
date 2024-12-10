package com.proj.forum.service.impl;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.dto.UserDto;
import com.proj.forum.entity.Group;
import com.proj.forum.entity.User;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@Transactional
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        log.info("Creating user in service");
        User user = getUser(userDto);
        User userFromDB = userRepository.save(user);
        return getUserDto(userFromDB);
    }

    @Override
    public UserDto getUser(UUID id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty())
        {
            log.info("No user");
            return null;
        }

        UserDto userDto = UserDto.builder()
                .id(user.get().getId())
                .name(user.get().getName())
                .username(user.get().getUsername() == null ? StringUtils.EMPTY : user.get().getName())
                .build();
        return userDto;
    }

    @Override
    public List<UserDto> getAllUsers(){
        List<User> groupList = userRepository.findAll();
        log.info("getAllGroups");

        return groupList.stream()
                .map(UserServiceImpl::getUserDto)
                .toList();
    }

    private static User getUser(UserDto userDto) {
        if(userDto == null)
        {
            log.error("User is null");
            throw new NullPointerException();
        }
        log.info("Creating user from userDto");

        return User.builder()
                .name(userDto.name())
                .username(userDto.username())
                .build();
    }

    private static UserDto getUserDto(User user) {
        if (user == null) {
            log.info("No user found");
            throw new EntityNotFoundException("No user found");
        }
        log.info("Creating userDto from user");

        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .build();
    };

}
