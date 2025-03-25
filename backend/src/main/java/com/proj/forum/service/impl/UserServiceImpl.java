package com.proj.forum.service.impl;

import com.proj.forum.dto.UserDto;
import com.proj.forum.dto.UserUpdateDto;
import com.proj.forum.entity.User;
import com.proj.forum.exception.TokenTypeException;
import com.proj.forum.helper.UserHelper;
import com.proj.forum.strategy.UserMapper;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@Transactional("postgreTransactionManager")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    //private final UserStatisticRepository userStatisticRepository;

    @Override
    public UUID createUser(UserDto userDto) {
        User user = userMapper.mapToEntity(userDto);
        User userFromDB = userRepository.save(user);
        return userFromDB.getId();
    }

    @Override
    public UUID checkOrCreateUserByGoogle() {
        String email = getEmail();
        Optional<User> user = userRepository.findByEmail(email);
        return getUserOrGenerateNew(user, email);
    }

    @Override
    public UserDto getUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("User not found"));
        return userMapper.mapToDto(user);
    }

    @Override
    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("User not found"));
        return userMapper.mapToDto(user);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("User not found"));
        return userMapper.mapToDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> userList = userRepository.findAll();
        if (userList.isEmpty()) {
            throw new EntityNotFoundException("User not found");
        }
        return userList.stream()
                .map(userMapper::mapToDto)
                .toList();
    }

    @Override
    public void updateUser(UUID id, UserUpdateDto userDto) {
        User updatedUser = userRepository.findById(id)
                .map(user -> getUpdateUser(user, userDto))
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        userRepository.save(updatedUser);
    }

    @Override
    public void deleteUser(UUID id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("User not found");
        }
    }

//    @Override
//    public void changeStat(StatisticDto statisticDto) {
//        if(userStatisticRepository.existsByObjectIdAndUserId(statisticDto.userId(), statisticDto.objectId())){
//            Statistic statistic = userStatisticRepository.getStatisticByUserIdAndObjectId(statisticDto.userId(), statisticDto.objectId());
//            User user = userRepository.findById(statisticDto.userId()).get();
//
//            user.getStatisticList()
//        }
//    }

    @Override
    public Boolean followUser(UUID userId) {
        User followedUser = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("Followed user not found"));

        String email = getEmail();
        User currentUser = userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("Current user not found"));
        if (currentUser.getFollowing().contains(followedUser)) {
            currentUser.getFollowing().remove(followedUser);
            followedUser.getSubscribers().remove(currentUser);
            userRepository.save(currentUser);
            userRepository.save(followedUser);
            return false;
        } else {
            currentUser.getFollowing().add(followedUser);
            followedUser.getSubscribers().add(currentUser);
            userRepository.save(currentUser);
            userRepository.save(followedUser);
            return true;
        }
    }

    @Override
    public List<UserDto> getByUsernameContain(String name) {
        return mapToUserDtoList(userRepository.findByUsernameContainingIgnoreCase(name));
    }

    private User getUpdateUser(User user, UserUpdateDto userDto) {
        if (userDto.firstName() != null)
            user.setName(userDto.firstName());
        if (userDto.nickName() != null)
            user.setUsername(userDto.nickName());
        if (userDto.profileImage() != null)
            user.setProfileImage(userDto.profileImage());
        return user;
    }

    private String getEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof JwtAuthenticationToken token)) {
            throw new TokenTypeException("User not found");
        }
        var jwt = (Jwt) token.getPrincipal();
        return jwt.getClaims().get("sub").toString();
    }

    private UUID getUserOrGenerateNew(Optional<User> user, String email) {
        if (user.isPresent()) {
            return user.get().getId();
        } else {
            String nickName = UserHelper.createNickname(email);
            User newUser = User.builder()
                    .name(nickName)
//                    .profileImage(StringUtils.EMPTY)
                    .email(email)
                    .username(nickName)
                    .build();

            User savedUser = userRepository.save(newUser);
            return savedUser.getId();
        }
    }

    @Override
    public List<UserDto> mapToUserDtoList(List<User> users) {
        return users.stream()
                .map(userMapper::mapToDto)
                .toList();
    }
}
