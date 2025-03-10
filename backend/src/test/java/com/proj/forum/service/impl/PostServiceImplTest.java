package com.proj.forum.service.impl;

import com.proj.forum.dto.PostRequestDto;
import com.proj.forum.dto.PostResponseDto;
import com.proj.forum.entity.Group;
import com.proj.forum.entity.Post;
import com.proj.forum.entity.User;
import com.proj.forum.repository.GroupRepository;
import com.proj.forum.repository.PostRepository;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.CommentService;
import jakarta.persistence.EntityNotFoundException;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
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

    @Mock
    private CommentService commentService;

    @InjectMocks
    private PostServiceImpl postService;

    private PostRequestDto postDto;
    private List<PostResponseDto> postResponseDto;
    private User user;
    private Group group;
    private Post post;

    @BeforeAll
    void setUp() {
        UUID userId = UUID.randomUUID();
        UUID groupId = UUID.randomUUID();

        postDto = PostRequestDto.builder()
                .tag_id(UUID.randomUUID())
                .title("Test Title")
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
                .viewCount(0)
                .build();
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void CreatePost_Success() {
        user.getGroups().add(group);

        when(groupRepository.findById(postDto.group_id())).thenReturn(Optional.of(group));
        when(userRepository.findById(postDto.user_id())).thenReturn(Optional.of(user));
        when(postRepository.save(any(Post.class))).thenReturn(post);

        UUID postId = postService.createPost(postDto);

        assertThat(postId)
                .isNotNull()
                .isEqualTo(post.getId());

        verify(groupRepository).findById(postDto.group_id());
        verify(userRepository).findById(postDto.user_id());
        verify(postRepository).save(any(Post.class));
    }

    @Test
    void CreatePost_GroupNotFound() {
        when(groupRepository.findById(postDto.group_id())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> postService.createPost(postDto))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("Group not found");

        verify(groupRepository).findById(postDto.group_id());
        verify(userRepository, never()).findById(any());
        verify(postRepository, never()).save(any());
    }

    @Test
    void CreatePost_UserNotFound() {
        when(groupRepository.findById(postDto.group_id())).thenReturn(Optional.of(group));
        when(userRepository.findById(postDto.user_id())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> postService.createPost(postDto))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("User not found");

        verify(groupRepository).findById(postDto.group_id());
        verify(userRepository).findById(postDto.user_id());
        verify(postRepository, never()).save(any());
    }

    @Test
    void CreatePost_UserNotInGroup() {
        when(groupRepository.findById(postDto.group_id())).thenReturn(Optional.of(group));
        when(userRepository.findById(postDto.user_id())).thenReturn(Optional.of(user));

        when(group.getMembers()).thenReturn(Collections.emptyList());

        assertThatThrownBy(() -> postService.createPost(postDto))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("User is not in the group");

        verify(groupRepository).findById(postDto.group_id());
        verify(userRepository).findById(postDto.user_id());
        verify(postRepository, never()).save(any());
    }

    @Test
    void getAllPosts_Success() {
        List<Post> listPost = List.of(post);
        when(postRepository.findAll()).thenReturn(listPost);
        when(postService.mapToPostDtoList(listPost)).thenReturn(postResponseDto);

        List<PostResponseDto> result = postService.getAllPosts();

        assertThat(result).isNotEmpty();
        assertThat(result).hasSize(1);
        assertThat(result.getFirst().id()).isEqualTo(post.getId());
        assertThat(result.getFirst().title()).isEqualTo("Test Title");
    }

    @Test
    void getAllPosts_PostsNotFound(){
        when(postRepository.findAll()).thenReturn(Collections.emptyList());

        assertThatThrownBy(() -> postService.getAllPosts())
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("Posts not found");

        verify(postRepository).findAll();
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