package com.proj.forum.service.impl;

import com.proj.forum.dto.PostRequestDto;
import com.proj.forum.entity.Group;
import com.proj.forum.entity.Post;
import com.proj.forum.entity.User;
import com.proj.forum.repository.GroupRepository;
import com.proj.forum.repository.PostRepository;
import com.proj.forum.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class PostServiceImplTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private GroupRepository groupRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PostServiceImpl postService;

    private PostRequestDto postDto;
    private User user;
    private Group group;
    private Post post;

    @BeforeAll
    void setUp() {
        UUID userId = UUID.randomUUID();
        UUID groupId = UUID.randomUUID();

        postDto = PostRequestDto.builder()
                .tag_id(UUID.randomUUID())
                .title("Test Post")
                .user_id(userId)
                .group_id(groupId)
                .description("Test Description")
                .image("test-image-url")
                .build();

        user = User.builder()
                .id(userId)
                .username("testUser")
                .email("test@example.com")
                .name("Test User")
                .groups(new ArrayList<>())
                .build();

        group = Group.builder()
                .id(groupId)
                .title("Test Group")
                .description("Test Group Description")
                .members(new ArrayList<>())
                .build();

        post = Post.builder()
                .id(UUID.randomUUID())
                .title(postDto.title())
                .description(postDto.description())
                .image(postDto.image())
                .group(group)
                .author(user)
                .createdAt(LocalDateTime.now())
                .build();
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void testCreatePost_Success() {
        user.getGroups().add(group);
        //group.getMembers().add(user);

        when(groupRepository.findById(postDto.group_id())).thenReturn(Optional.of(group));
        when(userRepository.findById(postDto.user_id())).thenReturn(Optional.of(user));
        when(postRepository.save(any(Post.class))).thenReturn(post);

        UUID postId = postService.createPost(postDto);

        assertNotNull(postId);
        assertEquals(post.getId(), postId);

        verify(groupRepository).findById(postDto.group_id());
        verify(userRepository).findById(postDto.user_id());
        verify(postRepository).save(any(Post.class));
    }

    @Test
    void testCreatePost_GroupNotFound() {
        when(groupRepository.findById(postDto.group_id())).thenReturn(Optional.empty());

        Exception exception = assertThrows(EntityNotFoundException.class, () -> postService.createPost(postDto));

        assertEquals("Group not found", exception.getMessage());
        verify(groupRepository).findById(postDto.group_id());
        verify(userRepository, never()).findById(any());
        verify(postRepository, never()).save(any());
    }

    @Test
    void testCreatePost_UserNotFound() {
        when(groupRepository.findById(postDto.group_id())).thenReturn(Optional.of(group));
        when(userRepository.findById(postDto.user_id())).thenReturn(Optional.empty());

        Exception exception = assertThrows(EntityNotFoundException.class, () -> postService.createPost(postDto));

        assertEquals("User not found", exception.getMessage());
        verify(groupRepository).findById(postDto.group_id());
        verify(userRepository).findById(postDto.user_id());
        verify(postRepository, never()).save(any());
    }

    @Test
    void testCreatePost_UserNotInGroup() {
        when(groupRepository.findById(postDto.group_id())).thenReturn(Optional.of(group));
        when(userRepository.findById(postDto.user_id())).thenReturn(Optional.of(user));

        Exception exception = assertThrows(EntityNotFoundException.class, () -> postService.createPost(postDto));

        assertEquals("Group not found", exception.getMessage());
        verify(groupRepository).findById(postDto.group_id());
        verify(userRepository).findById(postDto.user_id());
        verify(postRepository, never()).save(any());
    }

    @Test
    void getAllPosts() {
    }

    @Test
    void getPostById() {
    }

    @Test
    void getPostsByUser() {
    }

    @Test
    void getPostsByGroup() {
    }

    @Test
    void updatePost() {
    }

    @Test
    void pinPost() {
    }

    @Test
    void deletePost() {
    }

    @Test
    void mapToPostDtoList() {
    }

    @Test
    void isAuthor() {
    }

    @Test
    void getByTitleContain() {
    }

    @Test
    void addView() {
    }
}