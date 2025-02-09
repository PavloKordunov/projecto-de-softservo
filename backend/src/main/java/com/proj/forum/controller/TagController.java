package com.proj.forum.controller;


import com.proj.forum.annotation.Logging;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.TagDto;
import com.proj.forum.service.TagService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Logging
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tags")
@CrossOrigin("http://localhost:3000")
public class TagController {

    private final TagService tagService;

    @PostMapping("/create")
    public ApiResponse<GenericResponse> createTag(@Valid @RequestBody TagDto tag) {
            UUID id = tagService.createTag(tag);
            return ApiResponse.apiResponse(true, 201, "Create tag", id);
    }

    @GetMapping
    public ApiResponse<List<TagDto>> getAllTags() {
        List<TagDto> groupsDto = tagService.getAllTags();
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Tags found", groupsDto);
    }

    @GetMapping("/{id}")
    public ApiResponse<TagDto> getTagById(@PathVariable @Valid UUID id) {
        TagDto tagDto = tagService.getTag(id);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getById", tagDto);
    }
}
