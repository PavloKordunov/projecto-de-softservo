package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record GroupDto(
        @NotNull UUID id,
        @NotBlank(message = "Title cannot be blank") String title,
        String description
) {
}
