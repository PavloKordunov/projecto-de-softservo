package com.proj.forum.controller;


import com.proj.forum.dto.TagDto;
import com.proj.forum.dto.TopicDto;
import com.proj.forum.service.TagService;
import com.proj.forum.service.TopicService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/tags")
@CrossOrigin("http://localhost:3000")
public class TagController {

    private TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PostMapping
    public void createTag(@RequestBody TagDto tag) {
        log.info("Create tag: {}", tag);
    } //should it be the same?
}
