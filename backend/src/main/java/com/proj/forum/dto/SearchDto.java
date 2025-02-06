package com.proj.forum.dto;


import java.util.List;

public record SearchDto(
        List<UserRequestDto> users,
        List<TopicDto> topics,
        List<GroupDto> groups,
        List<PostResponseDto> posts
) {}
