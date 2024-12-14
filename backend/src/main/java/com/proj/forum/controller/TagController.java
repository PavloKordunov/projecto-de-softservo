package com.proj.forum.controller;


import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.TagDto;
//import com.proj.forum.exception.CustomResourceNotFoundException;
import com.proj.forum.service.TagService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tags")
@CrossOrigin("http://localhost:3000")
public class TagController {

    private final TagService tagService;

    @PostMapping("/create")
    public void createTag(@RequestBody TagDto tag) {
        log.info("Create tag: {}", tag);
    } //should it be the same?


    @GetMapping
    public ApiResponse<List<TagDto>> getTags(){
        try {
            List<TagDto> tagDtos = tagService.getAllTags();
            return new ApiResponse<>(true, HttpStatus.OK, "Tags found", tagDtos);
        } catch (EntityNotFoundException ex){
            log.error("Tags not found");
            throw ex;
        }

    }
}
