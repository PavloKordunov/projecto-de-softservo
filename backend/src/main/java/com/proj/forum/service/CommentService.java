package com.proj.forum.service;

import com.proj.forum.dto.CommentDto;
import com.proj.forum.entity.Comment;
import com.proj.forum.entity.Statistic;

import java.util.List;
import java.util.UUID;

public interface CommentService {
    CommentDto createComment(CommentDto commentDto);
    List<CommentDto> getCommentsByObjectId(UUID objectId);

    CommentDto getCommentById(UUID commentId);

    void deleteComment(UUID id);


    List<CommentDto> getAllRepliesById(UUID parentId);

    CommentDto mapToCommentDto(Comment comment, Statistic statistic);
    List<CommentDto> mapToListOfCommentsDto(List<Comment> comments, Statistic statistic);
}
