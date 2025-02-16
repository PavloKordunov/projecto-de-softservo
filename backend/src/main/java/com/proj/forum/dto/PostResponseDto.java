package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record PostResponseDto(
        UUID id,
        @NotBlank String title,
        String description,
        String image,
        String name,
        @NotBlank String nickname,
        @NotBlank String user_image,
        boolean isPinned,
        @NotBlank String group_title,
        LocalDateTime createdAt,
        int viewCount
        ) {

}
