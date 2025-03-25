package com.proj.forum.strategy;

import com.proj.forum.dto.CommentDto;
import com.proj.forum.dto.TopicDto;
import com.proj.forum.entity.Topic;
import com.proj.forum.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TopicCustomMapper implements CustomMapper<Topic, TopicDto> {

    private final CommentService commentService;

    @Override
    public Topic mapToEntity(TopicDto topicDto) {
        return Topic.builder()
                .title(topicDto.title())
                .description(topicDto.description())
                .country(topicDto.country())
                .limitAge(topicDto.limitAge())
                .actor(topicDto.actor())
                .director(topicDto.director())
                .image(topicDto.image())
                .IMDB(topicDto.IMDB())
                .genre(topicDto.genre())
                .duration(topicDto.duration())
                .viewCount(0)
                .author_id(topicDto.author())
                .type(topicDto.topicType())
                .tag_id(topicDto.tagId())
                .releaseDate(topicDto.releaseDate())
                .build();
    }

    @Override
    public TopicDto mapToDto(Topic topic){
        List<CommentDto> comments = commentService.mapToListOfCommentsDto(topic.getComments());
        return TopicDto.builder()
                .id(topic.getId())
                .title(topic.getTitle())
                .description(topic.getDescription())
                .country(topic.getCountry())
                .limitAge(topic.getLimitAge())
                .actor(topic.getActor())
                .director(topic.getDirector())
                .image(topic.getImage())
                .IMDB(topic.getIMDB())
                .genre(topic.getGenre())
                .duration(topic.getDuration())
                .viewCount(topic.getViewCount())
                .author(topic.getAuthor_id())
                .topicType(topic.getType())
                .tagId(topic.getTag_id())
                .comments(comments)
                .releaseDate(topic.getReleaseDate())
                .build();
    }
}
