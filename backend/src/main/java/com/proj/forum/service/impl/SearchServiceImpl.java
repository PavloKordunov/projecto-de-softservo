package com.proj.forum.service.impl;

import com.proj.forum.dto.*;
import com.proj.forum.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final UserService userService;
    private final TopicService topicService;
    private final GroupService groupService;
    private final PostService postService;

    public SearchDto findByName(String query) {
        List<UserRequestDto> users = userService.getByUsernameContain(query);
        List<TopicDto> topics = topicService.getByTitleContain(query);
        List<GroupDto> groups = groupService.getByTitleContain(query);
        List<PostResponseDto> posts = postService.getByTitleContain(query);

        return new SearchDto(users, topics, groups, posts);
    }
}
