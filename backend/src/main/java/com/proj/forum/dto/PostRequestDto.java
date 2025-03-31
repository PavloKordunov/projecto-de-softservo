package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record PostRequestDto(
        UUID id,
        List<UUID> tagsId,
        @NotBlank(message = "Title cannot be blank") String title,
        @NotNull UUID userId,
        @NotNull UUID groupId,
        String description,
        String image

) {
}