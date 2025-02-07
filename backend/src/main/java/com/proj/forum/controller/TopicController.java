package com.proj.forum.controller;

import com.proj.forum.annotation.RequireRoles;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.TopicDto;
import com.proj.forum.service.TopicService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;



@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/topics")
@CrossOrigin("http://localhost:3000")
public class TopicController {

    private final TopicService topicService;

    @PostMapping("/create")
    public ApiResponse<GenericResponse> createTopic(@RequestBody @Valid TopicDto topic) {
        try {
            log.info("Create topic");
            UUID id = topicService.createTopic(topic);

            return ApiResponse.apiResponse(true, 201, "Create topic", id);
        } catch (EntityNotFoundException ex) {
            log.info("Topic is null");
            throw ex;
        }
    }

    @RequireRoles({"Everyone"})
    @GetMapping
    public ApiResponse<List<TopicDto>> getAllTopics() {
        log.info("Fetching all topics");
        List<TopicDto> topicsDto = topicService.getAllTopics();

        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Topics found", topicsDto);
    }

    @GetMapping("/{id}")
    public ApiResponse<TopicDto> getTopicById(@PathVariable @Valid UUID id) {

        log.info("Fetch topic");
        TopicDto topicDto = topicService.getTopic(id);

        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", topicDto);
    }

    @PatchMapping("/update/{id}")
    public ApiResponse<GenericResponse> updateTopic(
            @PathVariable @Valid UUID id,
            @RequestBody TopicDto topicDto) {
        try {
            log.info("Update topic");
            topicService.updateTopic(id, topicDto);
            return ApiResponse.apiResponse(true, 200, "Topic successfully updated", id);
        } catch (EntityNotFoundException ex) {
            log.error("No topic found [patch]");
            throw ex;
        }
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<GenericResponse> deleteTopic(@PathVariable @Valid UUID id) {
        try {
            log.info("Delete topic");
            topicService.deleteTopic(id);
            return ApiResponse.apiResponse(true, 200, "Topic successfully deleted", id);
        } catch (EntityNotFoundException ex) {
            log.error("No topic found [delete]");
            throw ex;
        }
    }
}
