package com.proj.forum.service;

import com.proj.forum.dto.PostRequestDto;
import com.proj.forum.dto.PostResponseDto;
import com.proj.forum.entity.Post;

import java.util.List;
import java.util.UUID;

public interface PostService {
    List<PostResponseDto> getPostsByGroup(UUID id);
    UUID createPost(PostRequestDto post);
    PostResponseDto getPostById(UUID id);
    List<PostResponseDto> getByTitleContain(String name);
    void deletePost(UUID id);
    void updatePost(UUID id, PostRequestDto postDto);
    List<PostResponseDto> mapToPostDtoList(List<Post> posts);
}
