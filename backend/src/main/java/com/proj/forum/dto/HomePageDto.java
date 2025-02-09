package com.proj.forum.dto;

import java.util.List;

public record HomePageDto(
        List<TopicDto> topics,
        List<TagDto> tags,
        List<GroupDto> groups,
        List<PostResponseDto> posts
) {}

