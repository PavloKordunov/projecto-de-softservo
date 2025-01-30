package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

import java.util.UUID;

@Builder
public record PostRequestDto(
        UUID id,
        UUID tag_id,
        @NotBlank(message = "Title cannot be blank") String title,
        UUID user_id,
        UUID group_id,
        String description,
        String image

) {
}