package com.proj.forum.controller;

import com.proj.forum.dto.TopicDto;
import com.proj.forum.entity.Topic;
import com.proj.forum.service.TopicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/topics")
@CrossOrigin("http://localhost:3000")
public class TopicController {

    private final TopicService topicService;

    @PostMapping
    public void createTopic(@RequestBody TopicDto topicDto) {

        //log.info("Create topicDto: {}", topicDto);
        //TopicDto savedTopic = topicService.createTopic(topicDto);

    }

//    @GetMapping
//    public List<Topic> getAllTopics() {
//        log.info("Fetching all topics");
//        return topicService.getAllTopics();
//    }

    @GetMapping
    public ResponseEntity<List<Topic>> getAllTopics() {
        // Mock response data
        List<Topic> topic = new ArrayList<>();

        topic.add(Topic.builder()
                .id(UUID.randomUUID())
                .title("Topic Terrifier 3")
                .description("Description for topic Terrifier 3")
                .build());

        topic.add(Topic.builder()
                .id(UUID.randomUUID())
                .title("Topic Home Alone")
                .description("Description for topic Home Alone")
                .build());

        return ResponseEntity.ok(topic);
    };
}
