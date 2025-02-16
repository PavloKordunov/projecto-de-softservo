package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record PostRequestDto(
        UUID id,
        UUID tag_id,
        @NotBlank(message = "Title cannot be blank") String title,
        @NotNull UUID user_id,
        @NotNull UUID group_id,
        String description,
        String image

) {
}