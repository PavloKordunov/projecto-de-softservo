package com.proj.forum.service.impl;

import com.proj.forum.dto.CommentDto;
import com.proj.forum.dto.TopicDto;
import com.proj.forum.entity.Topic;
import com.proj.forum.repository.TopicRepository;
import com.proj.forum.service.CommentService;
import com.proj.forum.service.TopicService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@Transactional("postgreTransactionManager")
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;
    private final CommentService commentService;

    @Override
    public UUID createTopic(TopicDto topicDto) {
        Topic topic = mapToTopic(topicDto);
        Topic topicFromDB = topicRepository.save(topic);
        return topicFromDB.getId();
    }

    @Override
    public TopicDto getTopic(UUID id) {
        Topic topic = topicRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Topic not found"));
        return getUpdateTopic(topic);
    }

    @Override
    public List<TopicDto> getAllTopics() {
        List<Topic> topicList = topicRepository.findAll();
        if (topicList.isEmpty()) {
            throw new EntityNotFoundException("Topics not found");
        }

        return topicList.stream()
                .map(this::getUpdateTopic)
                .toList();
    }

    @Override
    public void updateTopic(UUID id, TopicDto topicDto) {
        Topic updatedTopic = topicRepository.findById(id)
                .map(topic -> getUpdateTopic(topicDto))
                .orElseThrow(() -> new EntityNotFoundException("Topic not found"));

        topicRepository.save(updatedTopic);
    }

    private Topic getUpdateTopic(TopicDto topicDto) {
        return mapToTopic(topicDto);
    }

    @Override
    public void deleteTopic(UUID id) {
        if (topicRepository.existsById(id)) {
            topicRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Topic not found");
        }
    }

    @Override
    public void addView(UUID id) {
        Topic topic = topicRepository.findById(id).orElseThrow(
                ()-> new EntityNotFoundException("Topic not found"));
        topic.setViewCount((topic.getViewCount()) + 1);
    }

    @Override
    public List<TopicDto> getByTitleContain(String name) {
        return mapToTopicDtoList(topicRepository.findByTitleContainingIgnoreCase(name));
    }

    private static Topic mapToTopic(TopicDto topicDto) {
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

    private TopicDto getUpdateTopic(Topic topic) {
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

    @Override
    public List<TopicDto> mapToTopicDtoList(List<Topic> topics) {
        return topics.stream()
                .map(this::getUpdateTopic)
                .toList();
    }
}
