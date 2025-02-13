package com.proj.forum.service;

import com.proj.forum.dto.CommentDto;

import java.util.List;
import java.util.UUID;

public interface CommentService {
    void createComment(CommentDto commentDto);
    List<CommentDto> getCommentsByObjectId(UUID objectId);
    void deleteComment(UUID id);
}
