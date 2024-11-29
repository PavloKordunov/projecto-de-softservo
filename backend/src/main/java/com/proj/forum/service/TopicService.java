package com.proj.forum.service;

import com.proj.forum.dto.TopicDto;
import com.proj.forum.entity.Topic;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface TopicService {
    List<Topic> getAllTopics();
    public void createTopic (@RequestBody TopicDto topic);
}
