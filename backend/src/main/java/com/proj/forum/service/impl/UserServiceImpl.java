package com.proj.forum.service.impl;

import com.proj.forum.dto.UserDto;
import com.proj.forum.dto.UserUpdateDto;
import com.proj.forum.entity.User;
import com.proj.forum.exception.TokenTypeException;
import com.proj.forum.helper.UserHelper;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
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
    public UUID checkOrCreateUserByGoogle() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof JwtAuthenticationToken token) {
            var jwt= (Jwt) token.getPrincipal();
            String email = jwt.getClaims().get("sub").toString();
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                return user.get().getId();
            }
            else{
                String nickName;
                do{
                    nickName = UserHelper.createNickname(email);
                } while(userRepository.existsByUsername(nickName));

                User newUser = User.builder()
                        .name(nickName)
                        .profileImage(StringUtils.EMPTY)
                        .email(email)
                        .username(nickName)
                        .build();

                User savedUser = userRepository.save(newUser);
                return savedUser.getId();
            }
        }
        throw new TokenTypeException("User not found");
    }

    @Override
    public UserDto getUser(UUID id) {
        Optional<User> user;

        user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("No user found");
        }

        return getUserDto(user.get());
    }

    private UserDto getUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .nickName(user.getUsername()) //TODO remind ui about change
                .firstName(user.getName())
                .following(user.getFollowing().size())
                .subscribers(user.getSubscribers().size())
                .followingGroups(user.getCreatedGroups().size())
                .createdPosts(user.getCreatedPosts().size())
                .profileImage(user.getProfileImage() == null ? StringUtils.EMPTY : user.getProfileImage())
                .email(user.getEmail() == null ? StringUtils.EMPTY : user.getEmail())
                .build();
    }

    @Override
    public UserDto getUserByUsername(String username) {
        Optional<User> user;

        user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("No user found");
        }

        return getUserDto(user.get());
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("User don't find"));
        return getUserDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
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
        if (userDto.firstName() != null)
            user.setName(userDto.firstName());
        if (userDto.nickName() != null)
            user.setUsername(userDto.nickName());
        if (userDto.profileImage() != null)
            user.setProfileImage(userDto.profileImage());
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

    private static User mapToUser(UserDto userDto) {
        return User.builder()
                .name(userDto.firstName())
                .username(userDto.nickName() == null ? StringUtils.EMPTY : userDto.nickName())
                .email(userDto.email() == null ? StringUtils.EMPTY : userDto.email())
                .profileImage(userDto.profileImage() == null ? StringUtils.EMPTY : userDto.profileImage())
                .build();
    }

    private static UserDto getUpdateUser(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getName())
                .nickName(user.getUsername() == null ? StringUtils.EMPTY : user.getUsername())
                .email(user.getEmail() == null ? StringUtils.EMPTY : user.getEmail())
                .build();
    }

    @Override
    public List<UserDto> mapToUserDtoList(List<User> users) {
        return users.stream()
                .map(user -> UserDto.builder()
                        .id(user.getId())
                        .firstName(user.getName())
                        .nickName(user.getUsername() == null ? StringUtils.EMPTY : user.getUsername())
                        .email(user.getEmail() == null ? StringUtils.EMPTY : user.getEmail())
                        .build())
                .toList();
    }

    public List<UserDto> getByUsernameContain(String name) {
        return mapToUserDtoList(userRepository.findByUsernameContainingIgnoreCase(name));
    }

    @Override
    public Boolean followUser(UUID userId) {
        User followedUser = userRepository.findById(userId).orElseThrow(()-> new EntityNotFoundException("User not found"));

        String email = getEmail();
        User currentUser = userRepository.findByEmail(email).orElseThrow(()-> new EntityNotFoundException("User not found"));
        if(currentUser.getFollowing().contains(currentUser))
        {
            currentUser.getFollowing().remove(followedUser);
            userRepository.save(currentUser);
            return false;
        }
        else{
            currentUser.getFollowing().add(followedUser);
            userRepository.save(currentUser);
            return true;
        }
    }

    public static String getEmail() {  //fix it later
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof JwtAuthenticationToken token) {
            var jwt = (Jwt) token.getPrincipal();
            return jwt.getClaims().get("sub").toString();
        }
        throw new EntityNotFoundException("User not found");
    }
}
