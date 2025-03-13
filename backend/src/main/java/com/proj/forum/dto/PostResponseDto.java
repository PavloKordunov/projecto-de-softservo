package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
public record PostResponseDto(
        UUID id,
        @NotBlank String title,
        String description,
        String image,
        String name,
        @NotBlank String nickname,
        @NotBlank String userImage,
        boolean isPinned,
        @NotBlank String groupTitle,
        LocalDateTime createdAt,
        int viewCount,
        List<CommentDto> comments
        ) {

}
