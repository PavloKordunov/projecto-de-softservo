package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.CommentDto;
import com.proj.forum.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Logging
@RequestMapping("/api/comments")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/new")
    public ApiResponse<?> createComment(@RequestBody @Valid CommentDto commentDto){
        commentService.createComment(commentDto);
        return ApiResponse.apiResponse(true, 201, "Create comment", null);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<?> deleteComment(@PathVariable UUID id){
        commentService.deleteComment(id);
        return ApiResponse.apiResponse(true, 200, "Delete comment", null);
    }
}
