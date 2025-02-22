package com.proj.forum.service.impl;

import com.proj.forum.dto.CommentDto;
import com.proj.forum.dto.TopicDto;
import com.proj.forum.entity.Comment;
import com.proj.forum.entity.Topic;
import com.proj.forum.repository.CommentRepository;
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
@Transactional
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
        Optional<Topic> topic;
        topic = topicRepository.findById(id);
        if (topic.isEmpty()) {
            throw new EntityNotFoundException("No topic");
        }
        return getUpdateTopic(topic.get());
    }

    @Override
    public List<TopicDto> getAllTopics() {
        List<Topic> topicList;
        topicList = topicRepository.findAll();
        if (topicList.isEmpty()) {
            throw new EntityNotFoundException("No topics");
        }

        return topicList.stream()
                .map(this::getUpdateTopic)
                .toList();
    }

    @Transactional
    @Override
    public void updateTopic(UUID id, TopicDto topicDto) {
        Topic updatedTopic;
        try {
            updatedTopic = topicRepository.findById(id)
                    .map(topic -> getUpdateTopic(topic, topicDto))
                    .orElseThrow(() -> new EntityNotFoundException("Topic didn't find"));

            topicRepository.save(updatedTopic);
        } catch (RuntimeException ex) {
            throw new EntityNotFoundException(ex);
        }
    }

    private Topic getUpdateTopic(Topic topic, TopicDto topicDto) {
        //        if (topicDto.title() != null)         //TODO fix it asap (later)
//            topic.setTitle(topicDto.title());
//        if (topicDto.description() != null)
//            topic.setDescription(topicDto.description());
        return topic;
    }

    @Override
    public void deleteTopic(UUID id) {
        if (topicRepository.existsById(id)) {
            topicRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Not found topic");
        }
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
                .tag_id(topicDto.tag_id())
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
                .tag_id(topic.getTag_id())
                .comments(comments)
                .build();
    }

    @Override
    public List<TopicDto> mapToTopicDtoList(List<Topic> topics) {
        return topics.stream()
                .map(this::getUpdateTopic)
                .toList();
    }

    @Override
    public void addView(UUID id) {
        Optional<Topic> topic;
        topic = topicRepository.findById(id);
        if (topic.isEmpty()) {
            throw new EntityNotFoundException("No topic");
        }
        topic.get().setViewCount((topic.get().getViewCount()) + 1);
    }

    public List<TopicDto> getByTitleContain(String name) {
        return mapToTopicDtoList(topicRepository.findByTitleContainingIgnoreCase(name));
    }

}
