package com.proj.forum.service.impl;

import com.proj.forum.dto.UserDto;
import com.proj.forum.dto.UserUpdateDto;
import com.proj.forum.entity.User;
import com.proj.forum.exception.TokenTypeException;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.strategy.UserMapper;
import jakarta.persistence.EntityNotFoundException;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.List;
import java.util.UUID;
import java.util.Collections;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Map;

import static com.proj.forum.testdata.TestDto.getUserDto;
import static com.proj.forum.testdata.TestDto.getUserUpdateDto;
import static com.proj.forum.testdata.TestDto.getUser;
import static com.proj.forum.testdata.TestDto.getFollowedUser;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrowsExactly;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.never;
import static org.mockito.MockitoAnnotations.openMocks;


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @Mock
    private JwtAuthenticationToken token;

    @Mock
    private Jwt jwt;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserServiceImpl userService;

    private UserDto dto;
    private List<UserDto> dtoList;
    private UserUpdateDto updateDto;
    private User expectedUser;
    private User followedUser;

    private AutoCloseable autoCloseable;

    @BeforeAll
    void setUp() {

        autoCloseable = openMocks(this);

        dto = getUserDto();
        expectedUser = getUser();
        updateDto = getUserUpdateDto();
        followedUser = getFollowedUser();
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void createUser_SuccessTest() {
        when(userRepository.save(any(User.class))).thenReturn(expectedUser);
        when(userMapper.mapToEntity(dto)).thenReturn(expectedUser);

        UUID actualResult = userService.createUser(dto);

        assertThat(actualResult)
                .isNotNull()
                .isEqualTo(expectedUser.getId());

        verify(userRepository,atLeastOnce()).save(any(User.class));
        verify(userMapper,atLeastOnce()).mapToEntity(dto);
    }

    @Test
    void checkOrCreateUserByGoogle_UserExistsTest() {
        mockJwtToken();
        when(userRepository.findByEmail(expectedUser.getEmail())).thenReturn(Optional.of(expectedUser));

        UUID result = userService.checkOrCreateUserByGoogle();

        assertEquals(result,expectedUser.getId());
        verify(userRepository, atLeastOnce()).findByEmail(expectedUser.getEmail());
        verifyServicesJwtWereExecuted();
    }

    @Test
    void checkOrCreateUserByGoogle_UserNotExistsTest() {
        mockJwtToken();
        when(userRepository.findByEmail(expectedUser.getEmail())).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User savedUser = invocation.getArgument(0);
            savedUser.setId(UUID.randomUUID());
            return savedUser;
        });

        UUID result = userService.checkOrCreateUserByGoogle();

        assertNotNull(result);
        verify(userRepository, atLeastOnce()).findByEmail(expectedUser.getEmail());
        verifyServicesJwtWereExecuted();
    }

    @Test
    void checkOrCreateUserByGoogle_NoValidJwtTest() {
        SecurityContextHolder.clearContext();

        assertThrowsExactly(TokenTypeException.class, () -> userService.checkOrCreateUserByGoogle());

        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void getUser_SuccessTest() {
        when(userRepository.findById(expectedUser.getId())).thenReturn(Optional.of(expectedUser));
        when(userMapper.mapToDto(expectedUser)).thenReturn(dto);

        UserDto actualResult = userService.getUser(expectedUser.getId());

        assertNotNull(actualResult);
        assertEqualsToDto(actualResult);
        verify(userRepository, atLeastOnce()).findById(expectedUser.getId());
        verify(userMapper, atLeastOnce()).mapToDto(expectedUser);
    }

    @Test
    void getUser_UserNotFoundTest() {
        when(userRepository.findById(expectedUser.getId())).thenReturn(Optional.empty());

        assertThrowsExactly(EntityNotFoundException.class, () -> userService.getUser(expectedUser.getId()));

        verify(userRepository, atLeastOnce()).findById(expectedUser.getId());

    }

    @Test
    void getUserByUsername_SuccessTest() {
        when(userRepository.findByUsername(expectedUser.getUsername())).thenReturn(Optional.of(expectedUser));
        when(userMapper.mapToDto(expectedUser)).thenReturn(dto);

        UserDto actualResult = userService.getUserByUsername(expectedUser.getUsername());

        assertNotNull(actualResult);
        assertEqualsToDto(actualResult);
        verify(userRepository, atLeastOnce()).findByUsername(expectedUser.getUsername());
        verify(userMapper, atLeastOnce()).mapToDto(expectedUser);
    }

    @Test
    void getUserByUsername_UserNotFoundTest() {
        when(userRepository.findByUsername(expectedUser.getUsername())).thenReturn(Optional.empty());

        assertThrowsExactly(EntityNotFoundException.class, () -> userService.getUserByUsername(expectedUser.getUsername()));

        verify(userRepository, atLeastOnce()).findByUsername(expectedUser.getUsername());
    }

    @Test
    void getUserByEmail_SuccessTest() {
        when(userRepository.findByEmail(expectedUser.getEmail())).thenReturn(Optional.of(expectedUser));
        when(userMapper.mapToDto(expectedUser)).thenReturn(dto);

        UserDto actualResult = userService.getUserByEmail(expectedUser.getEmail());

        assertNotNull(actualResult);
        assertEqualsToDto(actualResult);
        verify(userRepository, atLeastOnce()).findByEmail(expectedUser.getEmail());
        verify(userMapper, atLeastOnce()).mapToDto(expectedUser);
    }

    @Test
    void getUserByEmail_UserNotFoundTest() {
        when(userRepository.findByEmail(expectedUser.getEmail())).thenReturn(Optional.empty());

        assertThrowsExactly(EntityNotFoundException.class, () -> userService.getUserByEmail(expectedUser.getEmail()));

        verify(userRepository, atLeastOnce()).findByEmail(expectedUser.getEmail());
    }

    @Test
    void getAllUsers_SuccessTest() {
        List<User> listUser = List.of(expectedUser);
        when(userRepository.findAll()).thenReturn(listUser);
        when(userMapper.mapToDto(expectedUser)).thenReturn(dto);

        List<UserDto> actualResult = userService.getAllUsers();

        assertThat(actualResult).isNotEmpty();
        assertThat(actualResult).hasSize(1);
        assertEqualsToListDto(actualResult);
        verify(userRepository, atLeastOnce()).findAll();
        verify(userMapper, atLeastOnce()).mapToDto(expectedUser);
    }

    @Test
    void getAllUsers_UserNotFoundTest() {
        when(userRepository.findAll()).thenReturn(Collections.emptyList());

        assertThrowsExactly(EntityNotFoundException.class, () -> userService.getAllUsers());

        verify(userRepository, atLeastOnce()).findAll();
    }

    @Test
    void updateUser_SuccessTest() {
        when(userRepository.findById(expectedUser.getId())).thenReturn(Optional.of(expectedUser));
        when(userRepository.save(any(User.class))).thenReturn(expectedUser);

        userService.updateUser(expectedUser.getId(), updateDto);

        assertEquals(expectedUser.getUsername(),updateDto.nickName());
        assertEquals(expectedUser.getName(),updateDto.firstName());
        assertEquals(expectedUser.getProfileImage(),updateDto.profileImage());

        verify(userRepository, atLeastOnce()).findById(expectedUser.getId());
        verify(userRepository, atLeastOnce()).save(any(User.class));
    }

    @Test
    void updateUser_UserNotFoundTest() {
        when(userRepository.findById(expectedUser.getId())).thenReturn(Optional.empty());

        UserUpdateDto updateDto = getUserUpdateDto();

        assertThrowsExactly(EntityNotFoundException.class, () -> userService.updateUser(expectedUser.getId(),updateDto));
        verify(userRepository, atLeastOnce()).findById(expectedUser.getId());
    }

    @Test
    void deleteUser_SuccessTest() {
        when(userRepository.existsById(expectedUser.getId())).thenReturn(true);

        userService.deleteUser(expectedUser.getId());

        verify(userRepository, atLeastOnce()).existsById(expectedUser.getId());
        verify(userRepository, atLeastOnce()).deleteById(expectedUser.getId());
    }

    @Test
    void deleteUser_UserNotFoundTest() {
        when(userRepository.existsById(expectedUser.getId())).thenReturn(false);

        assertThrowsExactly(EntityNotFoundException.class, () -> userService.deleteUser(expectedUser.getId()));

        verify(userRepository, atLeastOnce()).existsById(expectedUser.getId());
        verify(userRepository, never()).deleteById(expectedUser.getId());
    }

    @Test
    void followUser_UserAlreadyFollowedTest() {
        expectedUser.setFollowing(new ArrayList<>(List.of(followedUser)));

        when(userRepository.findById(followedUser.getId())).thenReturn(Optional.of(followedUser));
        when(userRepository.findByEmail(expectedUser.getEmail())).thenReturn(Optional.of(expectedUser));
        when(userRepository.save(any(User.class))).thenReturn(expectedUser);

        mockJwtToken();

        Boolean result = userService.followUser(followedUser.getId());

        assertFalse(result);
        assertFalse(expectedUser.getFollowing().contains(followedUser));

        verify(userRepository, atLeastOnce()).findById(followedUser.getId());
        verify(userRepository, atLeastOnce()).findByEmail(expectedUser.getEmail());
        verify(userRepository, atLeastOnce()).save(any(User.class));
        verifyServicesJwtWereExecuted();
    }

    @Test
    void followUser_UserNotFollowedTest() {
        expectedUser.setFollowing(new ArrayList<>());

        when(userRepository.findById(followedUser.getId())).thenReturn(Optional.of(followedUser));
        when(userRepository.findByEmail(expectedUser.getEmail())).thenReturn(Optional.of(expectedUser));
        when(userRepository.save(any(User.class))).thenReturn(expectedUser);
        mockJwtToken();
        Boolean result = userService.followUser(followedUser.getId());

        assertTrue(result);
        assertTrue(expectedUser.getFollowing().contains(followedUser));

        verify(userRepository, atLeastOnce()).findById(followedUser.getId());
        verify(userRepository, atLeastOnce()).findByEmail(expectedUser.getEmail());
        verify(userRepository, atLeastOnce()).save(any(User.class));
        verifyServicesJwtWereExecuted();
    }

    @Test
    void followUser_FollowedUserNotFoundTest() {
        when(userRepository.findById(followedUser.getId())).thenReturn(Optional.empty());

        assertThrowsExactly(EntityNotFoundException.class, () -> userService.followUser(followedUser.getId()));

        verify(userRepository, atLeastOnce()).findById(followedUser.getId());
    }

    @Test
    void followUser_ExpectedUserNotFoundTest() {
        when(userRepository.findById(followedUser.getId())).thenReturn(Optional.of(followedUser));
        when(userRepository.findByEmail(expectedUser.getEmail())).thenReturn(Optional.empty());
        mockJwtToken();

        assertThrowsExactly(EntityNotFoundException.class, () -> userService.followUser(followedUser.getId()));

        verify(userRepository, atLeastOnce()).findById(followedUser.getId());
        verify(userRepository, atLeastOnce()).findByEmail(expectedUser.getEmail());
        verifyServicesJwtWereExecuted();
    }

    @Test
    void getByUsernameContain_SuccessTest(){
        List<User> listUser = List.of(expectedUser);
        when(userRepository.findByUsernameContainingIgnoreCase(expectedUser.getUsername())).thenReturn(listUser);
        when(userMapper.mapToDto(expectedUser)).thenReturn(dto);

        List<UserDto> actualResult = userService.getByUsernameContain(expectedUser.getUsername());

        assertThat(actualResult).isNotEmpty();
        assertThat(actualResult).hasSize(1);
        assertEqualsToListDto(actualResult);
        verify(userRepository, atLeastOnce()).findByUsernameContainingIgnoreCase(expectedUser.getUsername());
        verify(userMapper, atLeastOnce()).mapToDto(expectedUser);
    }

    private void verifyServicesJwtWereExecuted() {
        verify(authentication, atLeastOnce()).getPrincipal();
        verify(token, atLeastOnce()).getPrincipal();
        verify(jwt, atLeastOnce()).getClaims();
        verify(securityContext, atLeastOnce()).getAuthentication();
    }

    private void mockJwtToken() {
        when(jwt.getClaims()).thenReturn(Map.of("sub", "test@example.com"));
        when(token.getPrincipal()).thenReturn(jwt);
        when(authentication.getPrincipal()).thenReturn(token);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        SecurityContextHolder.setContext(securityContext);
    }

    private void assertEqualsToDto(UserDto actualResult) {
        assertEquals(dto.nickName(), actualResult.nickName());
        assertEquals(dto.firstName(), actualResult.firstName());
        assertEquals(dto.email(), actualResult.email());
        assertEquals(dto.profileImage(), actualResult.profileImage());
    }

    private void assertEqualsToListDto(List<UserDto> actualResult) {
        assertThat(actualResult.getFirst().id()).isEqualTo(dto.id());
        assertThat(actualResult.getFirst().nickName()).isEqualTo(dto.nickName());
        assertThat(actualResult.getFirst().firstName()).isEqualTo(dto.firstName());
        assertThat(actualResult.getFirst().email()).isEqualTo(dto.email());
        assertThat(actualResult.getFirst().profileImage()).isEqualTo(dto.profileImage());

    }
}
