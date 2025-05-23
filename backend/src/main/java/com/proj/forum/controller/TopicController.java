package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.annotation.RequireRoles;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.ListResponse;
import com.proj.forum.dto.TopicDto;
import com.proj.forum.enums.RoleType;
import com.proj.forum.service.TopicService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Logging
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/topics")
@CrossOrigin("https://localhost:3000")
public class TopicController {

    private final TopicService topicService;

    @RequireRoles({RoleType.ADMIN})
    @PostMapping("/create")
    public ApiResponse<GenericResponse> createTopic(@RequestBody @Valid TopicDto topic) {
            UUID id = topicService.createTopic(topic);
            return ApiResponse.apiResponse(true, 201, "Create topic", id);
    }

//    @GetMapping
//    public ApiResponse<List<TopicDto>> getAllTopics() {
//        List<TopicDto> topicsDto = topicService.getAllTopics();
//        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Topics found", topicsDto);
//    }

    @GetMapping("/{id}")
    public ApiResponse<TopicDto> getTopicById(@PathVariable UUID id) {
        TopicDto topicDto = topicService.getTopic(id);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", topicDto);
    }

    @RequireRoles({RoleType.ADMIN})
    @PatchMapping("/update/{id}")
    public ApiResponse<GenericResponse> updateTopic(
            @PathVariable @Valid UUID id,
            @RequestBody TopicDto topicDto) {

            topicService.updateTopic(id, topicDto);
            return ApiResponse.apiResponse(true, 200, "Topic successfully updated", id);
    }

    @PatchMapping("/view/{id}")
    public void addView(@PathVariable @Valid UUID id){
        topicService.addView(id);
    }

    @RequireRoles({RoleType.ADMIN})
    @DeleteMapping("/delete/{id}")
    public ApiResponse<GenericResponse> deleteTopic(@PathVariable @Valid UUID id) {
            topicService.deleteTopic(id);
            return ApiResponse.apiResponse(true, 200, "Topic successfully deleted", id);
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<TopicDto>> getUserRatedTopics(@PathVariable UUID userId) {
        List<TopicDto> topicsDto = topicService.getUserRatedTopics(userId);

        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Topics found", topicsDto);
    }

    @GetMapping("/genre/{genre}")
    public ApiResponse<List<TopicDto>> getAllTopicsByGenre(
            @PathVariable String genre,
            @RequestParam(defaultValue = "releaseDate") String sort,
            @RequestParam(defaultValue = "desc") String order) {
        List<TopicDto> topics = topicService.getAllTopicsByGenre(genre, sort, order);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Topics found", topics);
    }

    @GetMapping
    public ApiResponse<List<TopicDto>> getAllTopics(
            @RequestParam(defaultValue = "releaseDate") String sort,
            @RequestParam(defaultValue = "desc") String order) {
        List<TopicDto> topics = topicService.getAllTopics(sort, order);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Topics found", topics);
    }

    @GetMapping("tag/{tagId}")
    public ListResponse<List<TopicDto>> getAllTopicsByTagId(@PathVariable UUID tagId) {
        List<TopicDto> topics = topicService.getAllTopicsByTagId(tagId);
        return new ListResponse<>(true, HttpStatusCode.valueOf(200), "Topics found",topics.size(), topics);
    }
}
