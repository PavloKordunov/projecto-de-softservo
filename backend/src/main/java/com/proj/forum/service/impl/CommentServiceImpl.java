package com.proj.forum.service.impl;

import com.proj.forum.dto.CommentDto;
import com.proj.forum.entity.Comment;
import com.proj.forum.entity.Post;
import com.proj.forum.entity.Topic;
import com.proj.forum.entity.User;
import com.proj.forum.repository.*;
import com.proj.forum.service.CommentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;


@Service
@AllArgsConstructor
@Transactional("postgreTransactionManager")
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserStatisticRepository userStatisticRepository;
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
        if (topic == null && post == null) {
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
        List<Comment> comments;
        if (postRepository.existsById(objectId)) {
            comments = commentRepository.findAllByPostIdOrderByCreatedAtDesc(objectId);
        } else {
            comments = commentRepository.findAllByTopicIdOrderByCreatedAtDesc(objectId);
        }
        return mapToListOfCommentsDto(comments);
    }

    @Override
    public CommentDto getCommentById(UUID commentId){
        Comment comment = commentRepository.findById(commentId).orElseThrow(
                ()-> new EntityNotFoundException("Comment not found"));
        return mapToCommentDto(comment);
    }

    @Override
    public void deleteComment(UUID id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Comment not found");
        }
    }

    @Override
    public List<CommentDto> getAllRepliesById(UUID parentId){
        List<Comment> comments = commentRepository.findAllByParentCommentId(parentId);
        return mapToListOfCommentsDto(comments);
    }


    private static Comment mapToComment(CommentDto commentDto, User user, Post post, Topic topic) {
        return Comment.builder()
                .content(commentDto.content())
                .post(post)
                .user(user)
                .topic(topic)
                .image(commentDto.image() != null ? commentDto.image() : StringUtils.EMPTY)
                //.parentComment(new Comment())
                .build();
    }

    @Override
    public CommentDto mapToCommentDto(Comment comment) {
        Integer countReplies = commentRepository.countByParentCommentId(comment.getId());
        Integer countLikes = userStatisticRepository.getTotalLikes(comment.getId());
        return CommentDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .image(comment.getImage())
                .parentComment(comment.getParentComment() == null ? null : comment.getParentComment().getId())
                .countReplies(countReplies)
                .countLikes(countLikes)
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
