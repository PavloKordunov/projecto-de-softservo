package com.proj.forum.service.impl;

import com.proj.forum.dto.CommentDto;
import com.proj.forum.entity.Comment;
import com.proj.forum.entity.Post;
import com.proj.forum.entity.Topic;
import com.proj.forum.entity.User;
import com.proj.forum.repository.CommentRepository;
import com.proj.forum.repository.PostRepository;
import com.proj.forum.repository.TopicRepository;
import com.proj.forum.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;
    private final PostRepository postRepository;

    @Override
    public CommentDto createComment(CommentDto commentDto) {
        User user = userRepository.findById(commentDto.userId()).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Topic topic = topicRepository.findById(commentDto.objectId())
                .orElse(null);
        Post post = postRepository.findById(commentDto.objectId())
                .orElse(null);
        if(topic == null && post == null) {
            throw new EntityNotFoundException("Topic or Post not found");
        }

        Comment comment = mapToComment(commentDto, user, post, topic);

        if (commentDto.parentComment() != null) {
            Comment parentComment = commentRepository.findById(commentDto.parentComment())
                    .orElseThrow(() -> new EntityNotFoundException("Parent comment not found"));
            comment.setParentComment(parentComment);
        }

        Comment com = commentRepository.save(comment);
        return mapToCommentDto(com);
    }

    @Override
    public List<CommentDto> getCommentsByPostId(UUID objectId) {
        List<Comment> comments = commentRepository.getAllByPost_Id(objectId);
        return mapToListOfCommentsDto(comments);
    }

    @Override
    public void deleteComment(UUID id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            return;
        }
        throw new EntityNotFoundException("Comment not found");
    }


    private static Comment mapToComment(CommentDto commentDto, User user, Post post, Topic topic) {
        return Comment.builder()
                .content(commentDto.content())
                .post(post)
                .user(user)
                .topic(topic)
                //.parentComment(new Comment())
                .build();
    }

    @Override
    public CommentDto mapToCommentDto(Comment comment) {
        return CommentDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .parentComment(comment.getParentComment() == null ? null : comment.getParentComment().getId())
                .userId(comment.getUser().getId())
                .nickName(comment.getUser().getUsername())
                .userName(comment.getUser().getName())
                .userImage(comment.getUser().getProfileImage())
                .build();
    }

    @Override
    public List<CommentDto> mapToListOfCommentsDto(List<Comment> comments) {
        return comments.stream()
                .map(this::mapToCommentDto)
                .toList();
    }
}
