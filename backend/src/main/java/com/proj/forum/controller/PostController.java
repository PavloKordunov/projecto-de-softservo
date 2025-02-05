package com.proj.forum.controller;

import com.proj.forum.dto.*;
import com.proj.forum.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
@CrossOrigin("http://localhost:3000")
public class PostController {

    private final PostService postService;

    @GetMapping
    public ApiResponse<List<PostResponseDto>> getAllPosts() {
        log.info("Fetching all posts");
        List<PostResponseDto> postsDto = postService.getAllPosts();

        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Posts found", postsDto);
    }

    @PostMapping("/create")
    public ApiResponse<GenericResponse> createPost(@RequestBody @Valid PostRequestDto postDto) {
        UUID postId = postService.createPost(postDto);
        return ApiResponse.apiResponse(true, 201, "Post created", postId);
    }

    @GetMapping("/group/{groupId}")
    public ApiResponse<List<PostResponseDto>> getPostsByGroup(@PathVariable UUID groupId) {
        List<PostResponseDto> posts = postService.getPostsByGroup(groupId);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Posts found", posts);
    }

    @GetMapping("/{postId}")
    public ApiResponse<PostResponseDto> getPostById(@PathVariable UUID postId) {
        PostResponseDto post = postService.getPostById(postId);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Post found", post);
    }

    @PatchMapping("/update/{postId}")
    public ApiResponse<GenericResponse> updatePost(
 //           @PathVariable UUID groupId,
            @PathVariable UUID postId,
            @RequestBody PostRequestDto postDto) {
        postService.updatePost(postId, postDto);
        return ApiResponse.apiResponse(true, 200, "Post updated", postId);
    }

    @PatchMapping("/pin/{postId}")
    public ApiResponse<GenericResponse> pinPost(@PathVariable UUID postId){
        boolean pin = postService.pinPost(postId);
        if(pin){
            return ApiResponse.apiResponse(true, 200, "Post pinned", postId);
        }
        else{
            return ApiResponse.apiResponse(true, 200, "Post unpinned", postId);
        }
    }

    @DeleteMapping("/delete/{postId}")
    public ApiResponse<GenericResponse> deletePost(
            @PathVariable UUID postId) {
        postService.deletePost(postId);
        return ApiResponse.apiResponse(true, 200, "Post deleted", postId);
    }
}

