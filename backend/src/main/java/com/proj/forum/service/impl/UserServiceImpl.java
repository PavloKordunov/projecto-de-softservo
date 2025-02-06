package com.proj.forum.service.impl;

import com.proj.forum.dto.UserRequestDto;
import com.proj.forum.dto.UserResponseDto;
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
    public UUID createUser(UserRequestDto userDto) {
        User user = mapToUser(userDto);
        User userFromDB = userRepository.save(user);
        return userFromDB.getId();
    }

    @Override
    public UserResponseDto getUser(UUID id) {
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

        return getUserResponseDto(user);
    }

    private UserResponseDto getUserResponseDto(Optional<User> user) {
        return UserResponseDto.builder()
                .id(user.get().getId())
                .name(user.get().getName())
                .username(user.get().getUsername())
                .following(user.get().getFollowing().size())
                .subscribers(user.get().getSubscribers().size())
                .followingGroups(user.get().getCreatedGroups().size())
                .profileImage(user.get().getEmail() == null ? StringUtils.EMPTY : user.get().getEmail())
                .build();
    }

    @Override
    public UserResponseDto getUserByUsername(String username){
        Optional<User> user;
        try{
            user = Optional.ofNullable(userRepository.findByUsername(username));
            if (user.isEmpty()) {
                log.info("No user found with username {}", username);
                throw new EntityNotFoundException("No user found");
            }
        }catch (RuntimeException ex){
            throw new EntityNotFoundException(ex);
        }

        return getUserResponseDto(user);
    }

    @Override
    public List<UserRequestDto> getAllUsers() {
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
    public void updateUser(UUID id, UserRequestDto userDto) {
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

    private User getUpdateUser(User user, UserRequestDto userDto) {
        if (userDto.firstName() != null)
            user.setName(userDto.firstName());
        if (userDto.nickName() != null)
            user.setUsername(userDto.nickName());
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

    private static User mapToUser(UserRequestDto userDto) {
        return User.builder()
                .name(userDto.firstName())
                .username(userDto.nickName() == null ? StringUtils.EMPTY : userDto.nickName())
                .email(userDto.email() == null ? StringUtils.EMPTY : userDto.email())
                .build();
    }

    private static UserRequestDto getUpdateUser(User user) {
        return UserRequestDto.builder()
                .id(user.getId())
                .firstName(user.getName())
                .nickName(user.getUsername() == null ? StringUtils.EMPTY : user.getUsername())
                .email(user.getEmail() == null ? StringUtils.EMPTY : user.getEmail())
                .build();
    }

    @Override
    public List<UserRequestDto> mapToUserDtoList(List<User> users) {
        return users.stream()
                .map(user -> UserRequestDto.builder()
                        .id(user.getId())
                        .firstName(user.getName())
                        .nickName(user.getUsername() == null ? StringUtils.EMPTY : user.getUsername())
                        .email(user.getEmail() == null ? StringUtils.EMPTY : user.getEmail())
                        .build())
                .toList();
    }

    public List<UserRequestDto> getByUsernameContain(String name){
        //List<Topic> topics = topicRepository.findByTitleContainingIgnoreCase(name);
        return mapToUserDtoList(userRepository.findByUsernameContainingIgnoreCase(name));
    }

}
