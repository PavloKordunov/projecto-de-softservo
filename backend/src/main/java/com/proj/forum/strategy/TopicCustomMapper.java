package com.proj.forum.strategy;

import com.proj.forum.dto.CommentDto;
import com.proj.forum.dto.TagDto;
import com.proj.forum.dto.TopicDto;
import com.proj.forum.entity.Statistic;
import com.proj.forum.entity.Tag;
import com.proj.forum.entity.Topic;
import com.proj.forum.entity.User;
import com.proj.forum.helper.UserHelper;
import com.proj.forum.repository.TagRepository;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.repository.UserStatisticRepository;
import com.proj.forum.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class TopicCustomMapper implements CustomMapper<Topic, TopicDto> {

    private final CommentService commentService;
    private final UserStatisticRepository userStatisticRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    @Override
    public Topic mapToEntity(TopicDto topicDto) {
        List<UUID> tagsId = new ArrayList<>();
        for(TagDto tagDto:topicDto.tagDtos()){
            tagsId.add(tagDto.id());
        }
        List<Tag> tags = tagRepository.findAllById(tagsId);
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
                .tags(tags)
                .releaseDate(topicDto.releaseDate())
                .build();
    }

    @Override
    public TopicDto mapToDto(Topic topic){
        List<CommentDto> comments = commentService.mapToListOfCommentsDto(topic.getComments());
        Double userRate = userStatisticRepository.findAverageRateByObjectId(topic.getId()).orElse(null);
        int userRateCount = userStatisticRepository.countStatisticsByObjectIdAndRateIsNotNull(topic.getId());
        List<TagDto> tags = topic.getTags().stream()
                .map(tag -> TagDto.builder()
                        .name(tag.getName())
                        .id(tag.getId())
                        .build())
                .toList();
        User user = userRepository.findByEmail(UserHelper.getEmail()).get();
        Statistic myStat = userStatisticRepository.getStatisticByObjectIdAndUserId(topic.getId(), user.getId()).get();
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
                .tagDtos(tags)
                .comments(comments)
                .releaseDate(topic.getReleaseDate())
                .userRate(userRate)
                .userRateCount(userRateCount)
                .myRate(myStat.getRate())
                .build();
    }
}
