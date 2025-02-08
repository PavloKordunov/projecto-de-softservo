package com.proj.forum.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record PostResponseDto(
        UUID id,
        String title,
        String description,
        String image,
        String name,
        String nickname,
        String user_image,
        boolean isPinned,
        String group_title
        ) {

}
