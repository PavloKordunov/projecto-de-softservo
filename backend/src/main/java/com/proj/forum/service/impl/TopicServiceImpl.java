package com.proj.forum.service.impl;

import com.proj.forum.entity.Topic;
import com.proj.forum.repository.TopicRepository;
import com.proj.forum.service.TopicService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
public class TopicServiceImpl implements TopicService {

    private TopicRepository topicRepository;

    @Autowired
    public TopicServiceImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @Override
    public List<Topic> getAllTopics() {
        Iterable<Topic> all = topicRepository.findAll();
        log.info("getAllTopics");
        return List.of(all.iterator().next());
    }
}
