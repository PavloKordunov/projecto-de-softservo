package com.proj.forum.controller;


import com.proj.forum.dto.TagDto;
import com.proj.forum.service.TagService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<TagDto>> getTags(){
        List<TagDto> tagDtos = tagService.getAllTags();
        if (tagDtos.isEmpty()) {
            log.info("No groups found");
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(tagDtos);
    }
}
