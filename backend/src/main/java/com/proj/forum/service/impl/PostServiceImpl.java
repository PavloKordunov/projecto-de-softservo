package com.proj.forum.service.impl;

import com.proj.forum.dto.PostRequestDto;
import com.proj.forum.dto.PostResponseDto;
import com.proj.forum.entity.Group;
import com.proj.forum.entity.Post;
import com.proj.forum.entity.User;
import com.proj.forum.repository.GroupRepository;
import com.proj.forum.repository.PostRepository;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.PostService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@Transactional
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    @Override
    public UUID createPost(PostRequestDto postDto) {
        Group group = groupRepository.findById(postDto.group_id()).orElseThrow(() -> new EntityNotFoundException("Group don't find"));
        User user = userRepository.findById(postDto.user_id()).orElseThrow(() -> new EntityNotFoundException("User not found"));
        if (!user.getGroups().contains(group)) {
            throw new EntityNotFoundException("Group not found");
        }
        Post post = mapToPost(postDto, user, group);
        Post postFromDB = postRepository.save(post);
        return postFromDB.getId();
    }

    @Override
    public List<PostResponseDto> getAllPosts() {
        List<Post> postList;
        postList = postRepository.findAll();
        if (postList.isEmpty()) {
            throw new EntityNotFoundException("No posts found");
        }

        return postList.stream()
                .map(PostServiceImpl::getUpdatePost)
                .toList();
    }

    @Override
    public PostResponseDto getPostById(UUID id) {
        Optional<Post> post;

        post = postRepository.findById(id);
        if (post.isEmpty()) {
            throw new EntityNotFoundException("No post");
        }

        return getUpdatePost(post.get());
    }

    @Override
    public List<PostResponseDto> getPostsByGroup(UUID groupId) {
        List<Post> postList;
        postList = postRepository.findAllByGroupId(groupId);
        if (postList.isEmpty()) {
            throw new EntityNotFoundException("No posts");
        }

        return postList.stream()
                .map(PostServiceImpl::getUpdatePost)
                .toList();
    }

    @Transactional
    @Override
    public void updatePost(UUID postId, PostRequestDto postDto) {
        Post updatedPost;
        updatedPost = postRepository.findById(postId)
                .map(post -> getUpdatePost(post, postDto))
                .orElseThrow(() -> new EntityNotFoundException("Post didn't find"));

        postRepository.save(updatedPost);
    }

    @Transactional
    @Override
    public boolean pinPost(UUID postId) {
        try {
            Post post = postRepository.findById(postId)
                    .orElseThrow(() -> new EntityNotFoundException("Post not found"));

            post.setPinned(!post.isPinned());
            postRepository.save(post);
            return post.isPinned();
        } catch (RuntimeException ex) {
            throw new EntityNotFoundException("Error occurred while pinning/unpinning post", ex);
        }
    }

    private Post getUpdatePost(Post post, PostRequestDto postDto) {
        if (postDto.title() != null)
            post.setTitle(postDto.title());
        if (postDto.description() != null)
            post.setDescription(postDto.description());
        if (postDto.image() != null)
            post.setImage(postDto.image());
        return post;
    }

    @Override
    public void deletePost(UUID id) {
        postRepository.deleteById(id);
    }

    private static Post mapToPost(PostRequestDto postDto, User user, Group group) {
        return Post.builder()
                .title(postDto.title())
                .description(postDto.description() == null ? StringUtils.EMPTY : postDto.description())
                .image(postDto.image())
                .author(user)
                .group(group)
                .isPinned(false)
                .createdDate(LocalDateTime.now())
                .build();
    }

    private static PostResponseDto getUpdatePost(Post post) {

        return PostResponseDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription() == null ? StringUtils.EMPTY : post.getDescription())
                .image(post.getImage() == null ? StringUtils.EMPTY : post.getImage())
                .user_image(post.getAuthor().getProfileImage())
                .nickname(post.getAuthor().getUsername())
                .name(post.getAuthor().getName())
                .isPinned(post.isPinned())
                .group_title(post.getGroup().getTitle())
                .build();
    }

    @Override
    public List<PostResponseDto> mapToPostDtoList(List<Post> posts) {
        return posts.stream()
                .map(PostServiceImpl::getUpdatePost)
                .toList();

    }

    @Override
    public void isAuthor(UUID postId, UUID userId) throws AccessDeniedException {
        if (!postRepository.findById(postId)
                .map(Post::getAuthor)
                .map(User::getId)
                .map(id -> id.equals(userId))
                .orElse(false)) {
            throw new AccessDeniedException("User is not the author of this post.");
        }
    }

    public List<PostResponseDto> getByTitleContain(String name) {
        return mapToPostDtoList(postRepository.findByTitleContainingIgnoreCase(name));
    }


}

