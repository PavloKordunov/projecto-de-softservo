package com.proj.forum.service.impl;

import com.proj.forum.dto.CommentDto;
import com.proj.forum.entity.Comment;
import com.proj.forum.repository.CommentRepository;
import com.proj.forum.service.CommentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;


@Service
@AllArgsConstructor
@Transactional
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public void createComment(CommentDto commentDto) {
        Comment comment = mapToComment(commentDto);

        if (commentDto.parentComment() != null) {
            Comment parentComment = commentRepository.findById(commentDto.parentComment())
                    .orElseThrow(() -> new EntityNotFoundException("Parent comment not found"));
            comment.setParentComment(parentComment);
        }

        commentRepository.save(comment);
    }

    @Override
    public List<CommentDto> getCommentsByObjectId(UUID objectId) {
        List<Comment> comments = commentRepository.findAllByObject(objectId);
        return mapToListOfCommentsDto(comments);
    }

    @Override
    public void deleteComment(UUID id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
        }
        throw new EntityNotFoundException("Comment not found");
    }


    private static Comment mapToComment(CommentDto commentDto) {
        return Comment.builder()
                .content(commentDto.content())
                .object(commentDto.object())
                .nickName(commentDto.nickName())
                .userImage(commentDto.userImage())
                .userName(commentDto.userName())
                .build();
    }

    private static CommentDto mapToCommentDto(Comment comment) {
        return CommentDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .userName(comment.getUserName())
                .nickName(comment.getNickName())
                .userImage(comment.getUserImage())
                .object(comment.getObject())
                .build();
    }

    private static List<CommentDto> mapToListOfCommentsDto(List<Comment> comments) {
        return comments.stream()
                .map(CommentServiceImpl::mapToCommentDto)
                .toList();
    }
}
