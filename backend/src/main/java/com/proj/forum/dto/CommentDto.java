package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record CommentDto(
        UUID id,
        @NotNull String content,
        @NotNull UUID object,
        @NotNull String userImage,
        @NotBlank String nickName,
        @NotBlank String userName,
        UUID parentComment
) {
}
