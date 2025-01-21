package com.proj.forum.service.impl;

import com.proj.forum.dto.UserDto;

import com.proj.forum.entity.User;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UUID createUser(UserDto userDto) {
        User user = mapToUser(userDto);
        User userFromDB = userRepository.save(user);
        return userFromDB.getId();
    }

    @Override
    public UserDto getUser(UUID id) {
        Optional<User> user;
        try {
            user = userRepository.findById(id);
            if (user.isEmpty()) {
                log.info("No user found with id {}", id);
                throw new EntityNotFoundException("No user found");
            }
        } catch (RuntimeException ex) {
            throw new EntityNotFoundException(ex);
        }

        return UserDto.builder()
                .id(id)
                .name(user.get().getName())
                .username(user.get().getUsername() == null ? StringUtils.EMPTY : user.get().getUsername())
                .email(user.get().getEmail() == null ? StringUtils.EMPTY : user.get().getEmail())
                .build();
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> userList;
        try {
            userList = userRepository.findAll();
            log.info("getAllUsers");
            if (userList.isEmpty()) {
                log.info("No users found");
                throw new EntityNotFoundException("No users");
            }
        } catch (RuntimeException ex) {
            throw new EntityNotFoundException(ex);
        }

        return userList.stream()
                .map(UserServiceImpl::getUpdateUser)
                .toList();
    }

    @Transactional
    @Override
    public void updateUser(UUID id, UserDto userDto) {
        log.info("Update user by patch");
        User updatedUser;
        try {
            updatedUser = userRepository.findById(id)
                    .map(user -> getUpdateUser(user, userDto))
                    .orElseThrow(() -> new EntityNotFoundException("User is not found"));

            userRepository.save(updatedUser);
        } catch (RuntimeException ex) {
            throw new EntityNotFoundException(ex);
        }
    }

    private User getUpdateUser(User user, UserDto userDto) {
        if (userDto.name() != null)
            user.setName(userDto.name());
        if (userDto.username() != null)
            user.setUsername(userDto.username());
        if (userDto.email() != null)
            user.setEmail(userDto.email());
        return user;
    }

    @Override
    public void deleteUser(UUID id) {
        try {
            if (userRepository.existsById(id)) {
                userRepository.deleteById(id);
            } else {
                log.error("No user found with id {}", id);
                throw new EntityNotFoundException("User not found");
            }
        } catch (EntityNotFoundException ex) {
            throw new EntityNotFoundException(ex);
        }
    }

    private static User mapToUser(UserDto userDto) {
        return User.builder()
                .name(userDto.name())
                .username(userDto.username() == null ? StringUtils.EMPTY : userDto.username())
                .email(userDto.email() == null ? StringUtils.EMPTY : userDto.email())
                .build();
    }

    private static UserDto getUpdateUser(User user) {
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername() == null ? StringUtils.EMPTY : user.getUsername())
                .email(user.getEmail() == null ? StringUtils.EMPTY : user.getEmail())
                .build();
    }

    @Override
    public List<UserDto> mapToUserDtoList(List<User> users) {
        return users.stream()
                .map(user -> UserDto.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .username(user.getUsername() == null ? StringUtils.EMPTY : user.getUsername())
                        .email(user.getEmail() == null ? StringUtils.EMPTY : user.getEmail())
                        .build())
                .toList();
    }

    public List<UserDto> getByUsernameContain(String name){
        //List<Topic> topics = topicRepository.findByTitleContainingIgnoreCase(name);
        return mapToUserDtoList(userRepository.findByUsernameContainingIgnoreCase(name));
    }

}
