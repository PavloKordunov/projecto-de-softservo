package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.annotation.RequireRoles;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.TopicDto;
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
@CrossOrigin("http://localhost:3000")
public class TopicController {

    private final TopicService topicService;

    //@RequireRoles({"Admin"})
    @PostMapping("/create")
    public ApiResponse<GenericResponse> createTopic(@RequestBody @Valid TopicDto topic) {
            UUID id = topicService.createTopic(topic);
            return ApiResponse.apiResponse(true, 201, "Create topic", id);
    }


    @GetMapping
    public ApiResponse<List<TopicDto>> getAllTopics() {
        List<TopicDto> topicsDto = topicService.getAllTopics();
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Topics found", topicsDto);
    }

    @RequireRoles({"Everyone"})
    @GetMapping("/{id}")
    public ApiResponse<TopicDto> getTopicById(@PathVariable @Valid UUID id) {
        TopicDto topicDto = topicService.getTopic(id);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", topicDto);
    }

    @RequireRoles({"Admin"})
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

    @RequireRoles({"Admin"})
    @DeleteMapping("/delete/{id}")
    public ApiResponse<GenericResponse> deleteTopic(@PathVariable @Valid UUID id) {
            topicService.deleteTopic(id);
            return ApiResponse.apiResponse(true, 200, "Topic successfully deleted", id);
    }
}
