package com.proj.forum.service;

import com.proj.forum.dto.PostRequestDto;
import com.proj.forum.dto.PostResponseDto;
import com.proj.forum.entity.Post;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

public interface PostService {
    UUID createPost(PostRequestDto post);
    List<PostResponseDto> getAllPosts();
    List<PostResponseDto> getPostsByGroup(UUID id);
    List<PostResponseDto> getPostsByUser(UUID id);
    PostResponseDto getPostById(UUID id);
    List<PostResponseDto> getByTitleContain(String name);
    void updatePost(UUID id, PostRequestDto postDto);
    boolean pinPost(UUID postId);
    void deletePost(UUID postId);

    List<PostResponseDto> getUserPosts(UUID userId, String sort, String order);

    List<PostResponseDto> getUserLikedPosts(UUID userId, String sort, String order);

    List<PostResponseDto> getUserSavedPosts(UUID userId, String sort, String order);

    List<PostResponseDto> mapToPostDtoList(List<Post> posts);
    void isAuthor(UUID postId, UUID userId) throws AccessDeniedException;
    void addView(UUID id);

    PostResponseDto getRandomPost();
}
