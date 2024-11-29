package com.proj.forum.controller;

import com.proj.forum.dto.TopicDto;
import com.proj.forum.entity.Topic;
import com.proj.forum.service.TopicService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/topics")
@CrossOrigin("http://localhost:3000")
public class TopicController {

    private TopicService topicService;

    @Autowired
    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @PostMapping
    public void createTopic(@RequestBody TopicDto topicDto) {

        //log.info("Create topicDto: {}", topicDto);
        //TopicDto savedTopic = topicService.createTopic(topicDto);

    }

    @GetMapping
    public List<Topic> getAllTopics() {
        log.info("Fetching all topics");
        return topicService.getAllTopics();
    }
}
