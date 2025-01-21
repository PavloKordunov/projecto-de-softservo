package com.proj.forum.service.impl;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.dto.SearchDto;
import com.proj.forum.dto.TopicDto;
import com.proj.forum.dto.UserDto;
import com.proj.forum.service.GroupService;
import com.proj.forum.service.SearchService;
import com.proj.forum.service.TopicService;
import com.proj.forum.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final UserService userService;
    private final TopicService topicService;
    private final GroupService groupService;

    public SearchDto findByName(String query) {
        List<UserDto> users = userService.getByUsernameContain(query);
        List<TopicDto> topics = topicService.getByTitleContain(query);
        List<GroupDto> groups = groupService.getByTitleContain(query);

        return new SearchDto(users, topics, groups);
    }
}
