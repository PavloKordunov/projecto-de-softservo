package com.proj.forum.service.impl;

import com.proj.forum.dto.TopicDto;
import com.proj.forum.entity.Topic;
import com.proj.forum.repository.TopicRepository;
import com.proj.forum.service.TopicService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;

    @Override
    public UUID createTopic(TopicDto topicDto) {
        Topic topic = mapToTopic(topicDto);
        Topic topicFromDB = topicRepository.save(topic);
        return topicFromDB.getId();
    }

    @Override
    public TopicDto getTopic(UUID id) {
        Optional<Topic> topic;
        try {
            topic = topicRepository.findById(id);
            if (topic.isEmpty()) {
                log.info("No topic");
                throw new EntityNotFoundException("No topic");
            }
        } catch (RuntimeException ex) {
            throw new EntityNotFoundException(ex);
        }

        return TopicDto.builder()
                .id(id)
                .title(topic.get().getTitle())
                .description(topic.get().getDescription() == null ? StringUtils.EMPTY : topic.get().getDescription())
                .build();
    }

    @Override
    public List<TopicDto> getAllTopics() {
        List<Topic> topicList;
        try {
            topicList = topicRepository.findAll();
            log.info("getAllTopics");
            if (topicList.isEmpty()) {
                log.info("No topics");
                throw new EntityNotFoundException("No topics");
            }
        } catch (RuntimeException ex) {
            throw new EntityNotFoundException(ex);
        }

        return topicList.stream()
                .map(TopicServiceImpl::getUpdateTopic)
                .toList();
    }

    @Transactional
    @Override
    public void updateTopic(UUID id, TopicDto topicDto) {
        log.info("Update topic by put");
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
//        if (topicDto.title() != null)
//            topic.setTitle(topicDto.title());
//        if (topicDto.description() != null)
//            topic.setDescription(topicDto.description());
        return topic;
    }

    @Override
    public void deleteTopic(UUID id) {
        try {
            if (topicRepository.existsById(id)) {
                topicRepository.deleteById(id);
            } else {
                log.error("Not found topic");
                throw new EntityNotFoundException("Not found topic");
            }
        } catch (EntityNotFoundException ex) {
            throw new EntityNotFoundException(ex);
//        } catch (Exception ex){
//            throw new DbNotResponseException("Db error", ex);
        }
    }

    private static Topic mapToTopic(TopicDto topicDto) {
        return Topic.builder()
                .title(topicDto.title())
                .description(topicDto.description() == null ? StringUtils.EMPTY : topicDto.description())
                .country(topicDto.country())
                .limitAge(topicDto.limitAge())
                .actor(topicDto.actor())
                .image(topicDto.image())
                .IMDB(topicDto.IMDB())
//                .author(topicDto.author())
                .director(topicDto.director())
                .genre(topicDto.genre())
                .duration(topicDto.duration())
                .build();
    }

    private static TopicDto getUpdateTopic(Topic topic) {
        return TopicDto.builder()
                .id(topic.getId())
                .title(topic.getTitle())
                .description(topic.getDescription() == null ? StringUtils.EMPTY : topic.getDescription())
                .build();
    }


}
