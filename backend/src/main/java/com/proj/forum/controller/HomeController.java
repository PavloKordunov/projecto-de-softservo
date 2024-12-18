package com.proj.forum.controller;

import com.proj.forum.dto.*;
import com.proj.forum.service.GroupService;
import com.proj.forum.service.TagService;
import com.proj.forum.service.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;

//@Controller
//public class HomeController {
//
//    @GetMapping("/")
//    public String home(Model model, @AuthenticationPrincipal OidcUser principal) {
//        if (principal != null) {
//            model.addAttribute("profile", principal.getClaims());
//        }
//        return "home";
//
//        //connect all controllers here
//    }
//}

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/home")
public class HomeController {

    private final TopicService topicService;
    private final TagService tagService;
    private final GroupService groupService;


    @GetMapping
    public ResponseEntity<ApiResponse<HomePageDto>> getHomePageData() {
        List<TopicDto> topics = topicService.getAllTopics();
        List<TagDto> tags = tagService.getAllTags();
        List<GroupDto> groups = groupService.getAllGroups();

        HomePageDto response = new HomePageDto(topics, tags, groups);

        ApiResponse<HomePageDto> apiResponse = new ApiResponse<>(
                true,
                HttpStatus.OK,
                "Homepage data fetched successfully.",
                response
        );

        return ResponseEntity.ok(apiResponse);
    }
}
