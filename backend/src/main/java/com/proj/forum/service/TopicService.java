package com.proj.forum.service;

import com.proj.forum.dto.TopicDto;

import java.util.List;
import java.util.UUID;

public interface TopicService {
    List<TopicDto> getAllTopics();
    UUID createTopic(TopicDto topic);
    TopicDto getTopic(UUID id);
    void deleteTopic(UUID id);
    void updateTopic(UUID id, TopicDto topicDto);
}
