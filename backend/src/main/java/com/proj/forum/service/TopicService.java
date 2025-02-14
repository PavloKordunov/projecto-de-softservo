package com.proj.forum.service;

import com.proj.forum.dto.TopicDto;
import com.proj.forum.entity.Topic;

import java.util.List;
import java.util.UUID;

public interface TopicService {
    List<TopicDto> getAllTopics();
    UUID createTopic(TopicDto topic);
    TopicDto getTopic(UUID id);
    List<TopicDto> getByTitleContain(String name);
    void deleteTopic(UUID id);
    void updateTopic(UUID id, TopicDto topicDto);
    List<TopicDto> mapToTopicDtoList(List<Topic> topics);
    void addView(UUID id);
}
