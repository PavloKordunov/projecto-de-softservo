package com.proj.forum.service.impl;

import com.proj.forum.dto.UserDto;
import com.proj.forum.dto.UserUpdateDto;
import com.proj.forum.entity.User;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private SecurityContext securityContext;

    @InjectMocks
    private UserServiceImpl userService;
    private UserDto dto;
    private UserUpdateDto UpdateDto;
    private User user;


    @BeforeAll
    public void setUp() {
        
        dto = UserDto.builder()
                .nickName("Test Nickname")
                .firstName("Test Name")
                .email("test@gmail.com")
                .profileImage("test-image-url")
                .build();

        user = User.builder()
                .id(UUID.randomUUID())
                .username(dto.nickName())
                .name(dto.firstName())
                .email(dto.email())
                .profileImage(dto.profileImage())
                .build();
    }

    @AfterEach
    public void tearDown() {
    }

    @Test
    void testCreateUser_Success() {
        when(userRepository.save(any(User.class))).thenReturn(user);

        UUID userId = userService.createUser(dto);

        assertNotNull(userId);
        assertEquals(user.getId(),userId);

        verify(userRepository).save(any(User.class));
    }

//    @Test
//    void testCheckOrCreateUserByGoogle_UserExists() {
//        SecurityContextHolder.setContext(securityContext);
//
//        Jwt jwt = mock(Jwt.class);
//        when(jwt.getClaims()).thenReturn(Map.of("sub", user.getEmail()));
//
//        JwtAuthenticationToken token = mock(JwtAuthenticationToken.class);
//        when(token.getPrincipal()).thenReturn(jwt);
//
//        when(securityContext.getAuthentication()).thenReturn(token);
//        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
//
//
//        UUID result = userService.checkOrCreateUserByGoogle();
//        assertEquals(result,user.getId());
//    }

    @Test
    void testCheckOrCreateUserByGoogle_UserExists() {
        // Мок безпечного контексту
        SecurityContext securityContext = mock(SecurityContext.class);
        SecurityContextHolder.setContext(securityContext);

        // Мок JWT з коректними claims
        Jwt jwt = mock(Jwt.class);
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", "test@example.com");
        when(jwt.getClaims()).thenReturn(claims); // <-- ВАЖЛИВО, ТУТ НЕ NULL!

        // Мок токена, який повертає jwt
        JwtAuthenticationToken token = mock(JwtAuthenticationToken.class);
        when(token.getPrincipal()).thenReturn(jwt);

        // Встановлення токена в SecurityContext
        when(securityContext.getAuthentication()).thenReturn(token);

        // Мок юзера
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail("test@example.com");

        // Мок репозиторію користувачів
        UserRepository userRepository = mock(UserRepository.class);
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        System.out.println("SecurityContext: " + SecurityContextHolder.getContext().getAuthentication());
        System.out.println("Principal: " + SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        Jwt jwtFromContext = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("Claims: " + jwtFromContext.getClaims());

        // Створення сервісу та виклик методу
        UUID result = userService.checkOrCreateUserByGoogle();

        // Перевірка результату
        assertEquals(user.getId(), result);
    }


    @Test
    public void testGetUser_Success() {
            when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

            UserDto result = userService.getUser(user.getId());

            assertNotNull(result);
            assertEquals(user.getId(),result.id());
            assertEquals(user.getUsername(),result.nickName());
            assertEquals(user.getName(),result.firstName());
            verify(userRepository).findById(user.getId());
    }

    @Test
    void testGetUser_UserNotFound() {
        when(userRepository.findById(user.getId())).thenReturn(Optional.empty());

        Exception exception = assertThrows(EntityNotFoundException.class, () -> userService.getUser(user.getId()));

        assertEquals("No user found", exception.getMessage());
        verify(userRepository).findById(user.getId());

    }

    @Test
    void testGetUserByUsername_Success() {
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));

        UserDto result = userService.getUserByUsername(user.getUsername());

        assertNotNull(result);
        assertEquals(user.getId(),result.id());
        verify(userRepository).findByUsername(user.getUsername());
    }

    @Test
    void testGetUserByUsername_UserNotFound() {
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.empty());

        Exception exception = assertThrows(EntityNotFoundException.class, () -> userService.getUserByUsername(user.getUsername()));

        assertEquals("No user found", exception.getMessage());
        verify(userRepository).findByUsername(user.getUsername());
    }

    @Test
    void testGetUserByEmail_Success() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        UserDto result = userService.getUserByEmail(user.getEmail());

        assertNotNull(result);
        assertEquals(user.getId(),result.id());
        verify(userRepository).findByEmail(user.getEmail());
    }

    @Test
    void testGetUserByEmail_UserNotFound() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        Exception exception = assertThrows(EntityNotFoundException.class, () -> userService.getUserByEmail(user.getEmail()));

        assertEquals("User don't find", exception.getMessage());
        verify(userRepository).findByEmail(user.getEmail());
    }


}
