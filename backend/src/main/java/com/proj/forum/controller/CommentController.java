package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.annotation.RequireRoles;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.CommentDto;
import com.proj.forum.enums.RoleType;
import com.proj.forum.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Logging
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    //@RequireRoles({RoleType.USER})
    @PostMapping("/create")
    public ApiResponse<CommentDto> createComment(@RequestBody @Valid CommentDto commentDto){
        CommentDto comment = commentService.createComment(commentDto);
        return new ApiResponse<>(true, HttpStatus.CREATED, "Create comment", comment);
    }

    @GetMapping("/id/{id}")
    public ApiResponse<List<CommentDto>> getAllCommentsByObjectId(@PathVariable UUID id){
        List<CommentDto> comments = commentService.getCommentsByPostId(id);
        return new ApiResponse<>(true, HttpStatus.OK, "Get comments by object", comments);
    }

    @RequireRoles({RoleType.USER})
    @DeleteMapping("/delete/{id}")
    public ApiResponse<?> deleteComment(@PathVariable @Valid UUID id){
        commentService.deleteComment(id);
        return ApiResponse.apiResponse(true, 200, "Delete comment", null);
    }
}
