package com.proj.forum.service.impl;

import com.proj.forum.dto.UserRequestDto;
import com.proj.forum.dto.UserResponseDto;
import com.proj.forum.dto.UserUpdateDto;
import com.proj.forum.entity.User;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


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

        user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("No user found");
        }

        return getUserResponseDto(user.get());
    }

    private UserResponseDto getUserResponseDto(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .following(user.getFollowing().size())
                .subscribers(user.getSubscribers().size())
                .followingGroups(user.getCreatedGroups().size())
                .profileImage(user.getEmail() == null ? StringUtils.EMPTY : user.getEmail())
                .build();
    }

    @Override
    public UserResponseDto getUserByUsername(String username) {
        Optional<User> user;

        user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("No user found");
        }

        return getUserResponseDto(user.get());
    }

    @Override
    public UserResponseDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(()->new EntityNotFoundException("User don't find"));
        return getUserResponseDto(user);
    }

    @Override
    public List<UserRequestDto> getAllUsers() {
        List<User> userList;

        userList = userRepository.findAll();
        if (userList.isEmpty()) {
            throw new EntityNotFoundException("No users");
        }

        return userList.stream()
                .map(UserServiceImpl::getUpdateUser)
                .toList();
    }

    @Transactional
    @Override
    public void updateUser(UUID id, UserUpdateDto userDto) {
        User updatedUser;
        updatedUser = userRepository.findById(id)
                .map(user -> getUpdateUser(user, userDto))
                .orElseThrow(() -> new EntityNotFoundException("User is not found"));
        userRepository.save(updatedUser);
    }

    private User getUpdateUser(User user, UserUpdateDto userDto) {
        if (userDto.username() != null)
            user.setUsername(userDto.username());
        if (userDto.name() != null)
            user.setName(userDto.name());
        if (userDto.profileImg() != null)
            user.setProfileImage(userDto.profileImg());
        return user;
    }

    @Override
    public void deleteUser(UUID id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("User not found");
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

    public List<UserRequestDto> getByUsernameContain(String name) {
        return mapToUserDtoList(userRepository.findByUsernameContainingIgnoreCase(name));
    }

}
