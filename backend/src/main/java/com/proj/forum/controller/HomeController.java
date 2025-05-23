package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.dto.*;
import com.proj.forum.service.GroupService;
import com.proj.forum.service.PostService;
import com.proj.forum.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/home")
@Logging
@CrossOrigin("https://localhost:3000")
public class HomeController {

    private final TagService tagService;
    private final GroupService groupService; 
    private final PostService postService;

    @GetMapping
    public ApiResponse<HomePageDto> getHomePageData() {

        List<TagDto> tags = tagService.getAllTags();
        List<GroupDto> groups = groupService.getAllGroups();
        List<PostResponseDto> posts = postService.getAllPosts();

        HomePageDto response = new HomePageDto(tags, groups, posts);

        return new ApiResponse<>(true, HttpStatus.OK,
                "Homepage data fetched successfully.", response
        );
    }

}
