package com.proj.forum.service.impl;

import com.proj.forum.dto.PostRequestDto;
import com.proj.forum.dto.PostResponseDto;
import com.proj.forum.dto.TopicDto;
import com.proj.forum.entity.Group;
import com.proj.forum.entity.Post;
import com.proj.forum.entity.Topic;
import com.proj.forum.entity.User;
import com.proj.forum.repository.GroupRepository;
import com.proj.forum.repository.PostRepository;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.PostService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
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
        Post post = mapToPost(postDto, user, group);
        Post postFromDB = postRepository.save(post);
        return postFromDB.getId();
    }

    @Override
    public List<PostResponseDto> getAllPosts() {
        List<Post> postList;
        try {
            postList = postRepository.findAll();
            log.info("getAllPosts");
            if (postList.isEmpty()) {
                log.info("No posts found");
                throw new EntityNotFoundException("No posts found");
            }
        } catch (RuntimeException ex) {
            throw new EntityNotFoundException(ex);
        }

        return postList.stream()
                .map(PostServiceImpl::getUpdatePost)
                .toList();
    }

    @Override
    public PostResponseDto getPostById(UUID id) {
        Optional<Post> post;
        try {
            post = postRepository.findById(id);
            if (post.isEmpty()) {
                log.info("No post");
                throw new EntityNotFoundException("No post");
            }
        } catch (RuntimeException ex) {
            throw new EntityNotFoundException(ex);
        }

        return PostResponseDto.builder()
                .id(id)
                .title(post.get().getTitle())
                .description(post.get().getDescription() == null ? StringUtils.EMPTY : post.get().getDescription())
                .build();
    }

    @Override
    public List<PostResponseDto> getPostsByGroup(UUID groupId) {
        List<Post> postList;
        try {
            postList = postRepository.findAllByGroupId(groupId);
            log.info("getAllPosts");
            if (postList.isEmpty()) {
                log.info("No posts");
                throw new EntityNotFoundException("No posts");
            }
        } catch (RuntimeException ex) {
            throw new EntityNotFoundException(ex);
        }

        return postList.stream()
                .map(PostServiceImpl::getUpdatePost)
                .toList();
    }

    @Transactional
    @Override
    public void updatePost(UUID id, PostRequestDto postDto) {
        log.info("Update post by put");
        Post updatedPost;
        try {
            updatedPost = postRepository.findById(id)
                    .map(post -> getUpdatePost(post, postDto))
                    .orElseThrow(() -> new EntityNotFoundException("Post didn't find"));

            postRepository.save(updatedPost);
        } catch (RuntimeException ex) {
            throw new EntityNotFoundException(ex);
        }
    }

  //  @Transactional
    @Override
    public boolean pinPost(UUID id) {
        log.info("Pin/unpin post by patch");
        try {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Post not found"));

            post.setPinned(!post.isPinned());
            postRepository.save(post);
            return post.isPinned();
        } catch (RuntimeException ex) {
            log.error("Error occurred while pinning/unpinning post", ex);
            throw new EntityNotFoundException("Error occurred while pinning/unpinning post", ex);
        }
    }

    private Post getUpdatePost(Post post, PostRequestDto postDto) {
        if (postDto.title() != null)
            post.setTitle(postDto.title());
        if (postDto.description() != null)
            post.setDescription(postDto.description());
        if(postDto.image() != null)
            post.setImage(postDto.image());
        return post;
    }

    @Override
    public void deletePost(UUID id) {
        try {
            if (postRepository.existsById(id)) {
                postRepository.deleteById(id);
            } else {
                log.error("Not found post");
                throw new EntityNotFoundException("Not found post");
            }
        } catch (EntityNotFoundException ex) {
            throw new EntityNotFoundException(ex);
        }
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
                .build();
    }

    @Override
    public List<PostResponseDto> mapToPostDtoList(List<Post> posts) {
        return posts.stream()
                .map(post -> PostResponseDto.builder()
                        .id(post.getId())
                        .title(post.getTitle())
                        .description(post.getDescription() == null ? StringUtils.EMPTY : post.getDescription())
                        .image(post.getImage() == null ? StringUtils.EMPTY : post.getImage())
                        .user_image(post.getAuthor().getProfileImage())
                        .nickname(post.getAuthor().getUsername())
                        .name(post.getAuthor().getName())
                        .build())
                        .toList();

    }

    public List<PostResponseDto> getByTitleContain(String name){
        return mapToPostDtoList(postRepository.findByTitleContainingIgnoreCase(name));
    }


}

