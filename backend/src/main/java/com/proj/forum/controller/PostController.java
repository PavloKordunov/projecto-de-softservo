package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.annotation.RequireRoles;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.ListResponse;
import com.proj.forum.dto.PostRequestDto;
import com.proj.forum.dto.PostResponseDto;
import com.proj.forum.enums.RoleType;
import com.proj.forum.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

@Logging
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
@CrossOrigin("https://localhost:3000")
public class PostController {

    private final PostService postService;

    @GetMapping
    public ApiResponse<List<PostResponseDto>> getAllPosts() {
        List<PostResponseDto> postsDto = postService.getAllPosts();
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Posts found", postsDto);
    }

    @RequireRoles({RoleType.USER})
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

    @GetMapping("/tag/{tagId}")
    public ListResponse<List<PostResponseDto>> getPostsByTag(@PathVariable UUID tagId) {
        List<PostResponseDto> posts = postService.getPostsByTag(tagId);
        return new ListResponse<>(true, HttpStatusCode.valueOf(200), "Posts found", posts.size(), posts);
    }

    @GetMapping("/random")
    public ApiResponse<PostResponseDto> getRandomPost() {
        PostResponseDto post = postService.getRandomPost();
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Success get random post", post);
    }

    @RequireRoles({RoleType.USER})
    @PatchMapping("/update/{postId}")
    public ApiResponse<GenericResponse> updatePost(
            @PathVariable UUID postId,
            @RequestBody @Valid PostRequestDto postDto) throws AccessDeniedException {
        postService.isAuthor(postId, postDto.userId()); //TODO fix?
        postService.updatePost(postId, postDto);
        return ApiResponse.apiResponse(true, 200, "Post updated", postId);
    }

    @RequireRoles({RoleType.USER})
    @PatchMapping("/pin/{postId}")
    public ApiResponse<GenericResponse> pinPost(@PathVariable UUID postId) {
        boolean pin = postService.pinPost(postId);
        if (pin) {
            return ApiResponse.apiResponse(true, 200, "Post pinned", postId);
        } else {
            return ApiResponse.apiResponse(true, 200, "Post unpinned", postId);
        }
    }

    @RequireRoles({RoleType.USER})
    @DeleteMapping("/delete/{postId}/author/{authorId}")
    public ApiResponse<GenericResponse> deletePost(@PathVariable UUID postId, @PathVariable UUID authorId) throws AccessDeniedException {
        postService.isAuthor(postId, authorId);
        postService.deletePost(postId);
        return ApiResponse.apiResponse(true, 200, "Post deleted", postId);
    }


    @PatchMapping("/view/{id}")
    public void addView(@PathVariable UUID id) {
        postService.addView(id);
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<PostResponseDto>> getUserPosts(
            @PathVariable UUID userId,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String order) {

        List<PostResponseDto> posts = postService.getUserPosts(userId, sort, order);
        return new ApiResponse<>(true, HttpStatus.OK, "Post sorted", posts);
    }

    @GetMapping("/user/liked/{userId}")
    public ApiResponse<List<PostResponseDto>> getUserLikedPosts(
            @PathVariable UUID userId,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String order) {
        List<PostResponseDto> posts = postService.getUserLikedPosts(userId, sort, order);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Post sorted", posts);
    }

    @GetMapping("/user/saved/{userId}")
    public ApiResponse<List<PostResponseDto>> getUserSavedPosts(
            @PathVariable UUID userId,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String order) {
        List<PostResponseDto> posts = postService.getUserSavedPosts(userId, sort, order);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Post sorted", posts);
    }
}

