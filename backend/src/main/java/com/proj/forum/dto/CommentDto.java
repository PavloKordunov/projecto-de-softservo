package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record CommentDto(
        UUID id,
        @NotBlank String content,
        String image,
        @NotNull UUID objectId,
        @NotNull UUID userId,
        String userImage,
        String nickName,
        String userName,
        UUID parentComment,
        Integer countReplies,
        Integer countLikes
) {
}
