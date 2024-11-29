package com.proj.forum.service.impl;

import com.proj.forum.dto.TopicDto;
import com.proj.forum.entity.Topic;

import com.proj.forum.repository.TopicRepository;
import com.proj.forum.service.TopicService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Slf4j
@Service
@Transactional
public class TopicServiceImpl implements TopicService {

    private TopicRepository topicRepository;

    @Override
    public List<Topic> getAllTopics() {

        log.info("getAllTopics");
        return List.of();
    }

    @Override
    public void createTopic (@RequestBody TopicDto topicDto){
        log.info("Saving new topic: {}", topicDto);

    }

}
