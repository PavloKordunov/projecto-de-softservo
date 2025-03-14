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
import com.proj.forum.testdata.TestEntity;
import jakarta.persistence.EntityNotFoundException;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.proj.forum.testdata.TestEntity.getGroup;
import static com.proj.forum.testdata.TestEntity.getPostRequestDto;
import static com.proj.forum.testdata.TestEntity.getUser;
import static com.proj.forum.testdata.TestEntity.getPost;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertThrowsExactly;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;

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
    private User expectedUser;
    private Group expectedGroup;
    private Post expectedPost;

    private AutoCloseable autoCloseable;

    @BeforeAll
    void setUp() {
        autoCloseable = openMocks(this);

        postDto = getPostRequestDto();
        expectedUser = getUser();
        expectedGroup = getGroup();
        expectedPost = getPost();
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void createPostSuccessTest() {
        expectedUser.getGroups().add(expectedGroup);
        mockServicesInPostServices(expectedGroup, expectedUser, expectedPost);

        UUID actualResult = postService.createPost(postDto);

        assertThat(actualResult)
                .isNotNull()
                .isEqualTo(expectedPost.getId());

        verifyThatServicesWereExecuted(postDto, false, false, false);
    }


    @Test
    void createPostGroupNotFoundTest() {
        when(groupRepository.findById(postDto.groupId())).thenReturn(Optional.empty());

        assertThrowsExactly(EntityNotFoundException.class, () -> postService.createPost(postDto));

        verifyThatServicesWereExecuted(postDto, false, true, true);
    }

    @Test
    void createPostUserNotFoundTest() {
        when(groupRepository.findById(postDto.groupId())).thenReturn(Optional.of(expectedGroup));
        when(userRepository.findById(postDto.userId())).thenReturn(Optional.empty());

        assertThrowsExactly(EntityNotFoundException.class, () -> postService.createPost(postDto));

        verifyThatServicesWereExecuted(postDto, false, false, true);
    }

    @Test
    void createPostUserNotInGroupTest() {
        expectedGroup.setMembers(Collections.emptyList());
        when(groupRepository.findById(postDto.groupId())).thenReturn(Optional.of(expectedGroup));
        when(userRepository.findById(postDto.userId())).thenReturn(Optional.of(expectedUser));

        assertThrowsExactly(EntityNotFoundException.class, () -> postService.createPost(postDto));

        verifyThatServicesWereExecuted(postDto, false, false, true);
    }

    @Test
    void getAllPostsSuccessTest() {
        List<Post> listPost = List.of(expectedPost);
        when(postRepository.findAll()).thenReturn(listPost);
        when(postService.mapToPostDtoList(listPost)).thenReturn(postResponseDto);

        List<PostResponseDto> result = postService.getAllPosts();

        assertThat(result).isNotEmpty();
        assertThat(result).hasSize(1);
        assertThat(result.getFirst().id()).isEqualTo(expectedPost.getId());
        assertThat(result.getFirst().title()).isEqualTo("Test Title");
    }

    @Test
    void getAllPostsPostsNotFoundTest() {
        when(postRepository.findAll()).thenReturn(Collections.emptyList());

        assertThrowsExactly(EntityNotFoundException.class, () -> postService.getAllPosts());

        verify(postRepository).findAll();
    }

    @Test
    void getPostByIdSuccessTest() {
        when(postRepository.findById(TestEntity.getPost().getId())).thenReturn(Optional.of(expectedPost));

        Optional<Post> result = postRepository.findById(TestEntity.getPost().getId());

        assertThat(result).isNotEmpty();
        assertThat(result.get().getId()).isEqualTo(expectedPost.getId());

        verify(postRepository).findById(TestEntity.getPost().getId());
    }

    @Test
    void getPostByIdPostNotFoundTest() {
        when(postRepository.findById(TestEntity.getPost().getId())).thenReturn(Optional.empty());

        assertThrowsExactly(EntityNotFoundException.class,
                () -> postService.getPostById(TestEntity.getPost().getId()));

        verify(postRepository).findById(TestEntity.getPost().getId());
    }


    @Test
    void getPostsByUserSuccessTest() {
        List<Post> listPost = List.of(expectedPost);
        when(postRepository.findAllByAuthor_Id(TestEntity.getUser().getId())).thenReturn(listPost);
        when(postService.mapToPostDtoList(listPost)).thenReturn(postResponseDto);

        List<PostResponseDto> result = postService.getPostsByUser(TestEntity.getUser().getId());

        assertThat(result)
                .isNotEmpty()
                .hasSize(1);
        assertThat(result.getFirst().id()).isEqualTo(expectedPost.getId());
        assertThat(result.getFirst().title()).isEqualTo(expectedPost.getTitle());

        verify(postRepository).findAllByAuthor_Id(TestEntity.getUser().getId());
    }

    @Test
    void getPostsByUserPostsNotFoundTest() {
        when(postRepository.findAllByAuthor_Id(TestEntity.getUser().getId())).thenReturn(Collections.emptyList());

        assertThrowsExactly(EntityNotFoundException.class,
                () -> postService.getPostsByUser(TestEntity.getUser().getId()));

        verify(postRepository).findAllByAuthor_Id(TestEntity.getUser().getId());
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


    private void mockServicesInPostServices(Group group, User user, Post post) {
        when(groupRepository.findById(postDto.groupId())).thenReturn(Optional.of(group));
        when(userRepository.findById(postDto.userId())).thenReturn(Optional.of(user));
        when(postRepository.save(any(Post.class))).thenReturn(post);
    }

    private void verifyThatServicesWereExecuted(PostRequestDto postDto,
                                                boolean isGroupUsedStatementNever,
                                                boolean isUserUsedStatementNever,
                                                boolean isPostUsedStatementNever) {
        if (!isGroupUsedStatementNever)
            verify(groupRepository).findById(postDto.groupId());

        if (!isUserUsedStatementNever)
            verify(userRepository).findById(postDto.userId());
        else
            verify(userRepository, never()).findById(any());
        if (!isPostUsedStatementNever)
            verify(postRepository).save(any(Post.class));
        else
            verify(postRepository, never()).save(any());
    }
}