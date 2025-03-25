package com.proj.forum.service.impl;

import com.proj.forum.dto.TopicDto;
import com.proj.forum.entity.Topic;
import com.proj.forum.repository.TopicRepository;
import com.proj.forum.service.TopicService;
import com.proj.forum.strategy.TopicCustomMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;


@Service
@Transactional("postgreTransactionManager")
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;
    private final TopicCustomMapper topicMapper;

    @Override
    public UUID createTopic(TopicDto topicDto) {
        Topic topic = topicMapper.mapToEntity(topicDto);
        Topic topicFromDB = topicRepository.save(topic);
        return topicFromDB.getId();
    }

    @Override
    public TopicDto getTopic(UUID id) {
        Topic topic = topicRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Topic not found"));
        return topicMapper.mapToDto(topic);
    }

    @Override
    public List<TopicDto> getAllTopics() {
        List<Topic> topicList = topicRepository.findAll();
        if (topicList.isEmpty()) {
            throw new EntityNotFoundException("Topics not found");
        }

        return topicList.stream()
                .map(topicMapper::mapToDto)
                .toList();
    }

    @Override
    public void updateTopic(UUID id, TopicDto topicDto) {
        Topic updatedTopic = topicRepository.findById(id)
                .map(topic -> topicMapper.mapToEntity(topicDto))
                .orElseThrow(() -> new EntityNotFoundException("Topic not found"));

        topicRepository.save(updatedTopic);
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

    @Override
    public List<TopicDto> mapToTopicDtoList(List<Topic> topics) {
        return topics.stream()
                .map(topicMapper::mapToDto)
                .toList();
    }
}
