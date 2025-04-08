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
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@Component
@RequiredArgsConstructor
public class TopicCustomMapper implements CustomMapper<Topic, TopicDto> {

    private final CommentService commentService;
    private final UserStatisticRepository userStatisticRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    @Override
    public Topic mapToEntity(TopicDto topicDto) {
        List<Tag> tags;
        if(topicDto.tagsId() != null) {
            tags = tagRepository.findAllById(topicDto.tagsId());
        }
        else {
            tags = null;
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy", Locale.ENGLISH);
        LocalDate releaseDate = null;
        if (topicDto.releaseDate() != null) {
            releaseDate = LocalDate.parse(topicDto.releaseDate(), formatter);
        }


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
                .group_id(topicDto.groupId())
                .tags(tags)
                .releaseDate(releaseDate)
                .trailerURL(topicDto.trailerURL() == null ? StringUtils.EMPTY : topicDto.trailerURL())
                .build();
    }

    @Override
    public TopicDto mapToDto(Topic topic){
        List<CommentDto> comments = commentService.getCommentsByObjectId(topic.getId());
        Double userRate = userStatisticRepository.findAverageRateByObjectId(topic.getId()).orElse(null);
        int userRateCount = userStatisticRepository.countStatisticsByObjectIdAndRateIsNotNull(topic.getId());
        List<TagDto> tags = topic.getTags().stream()
                .map(tag -> TagDto.builder()
                        .name(tag.getName())
                        .id(tag.getId())
                        .build())
                .toList();

        String email = UserHelper.getEmail();
        User user;
        Statistic myStat;
        if(email != null){
            user = userRepository.findByEmail(email).get();
            if(userStatisticRepository.existsByObjectIdAndUserId(topic.getId(), user.getId())){
                myStat = userStatisticRepository.getStatisticByObjectIdAndUserId(topic.getId(), user.getId()).get();
            }
            else{
                myStat = null;
            }
        }
        else {
            myStat = null;
        }

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
                .responseReleaseDate(topic.getReleaseDate())
                .userRate(userRate)
                .groupId(topic.getGroup_id())
                .userRateCount(userRateCount)
                .myRate(myStat != null ? myStat.getRate() : null)
                .trailerURL(topic.getTrailerURL() == null ? StringUtils.EMPTY : topic.getTrailerURL())
                .build();
    }
}
