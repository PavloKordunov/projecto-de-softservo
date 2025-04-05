package com.proj.forum.service;

import com.proj.forum.dto.CommentDto;
import com.proj.forum.entity.Comment;

import java.util.List;
import java.util.UUID;

public interface CommentService {
    CommentDto createComment(CommentDto commentDto);
    List<CommentDto> getCommentsByPostId(UUID objectId);
    void deleteComment(UUID id);
    CommentDto mapToCommentDto(Comment comment);
    List<CommentDto> mapToListOfCommentsDto(List<Comment> comments);
}
