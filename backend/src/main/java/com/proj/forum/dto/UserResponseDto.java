package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record UserResponseDto(
        @NotNull UUID id,
        @NotNull String username,
        @NotNull String name,
        String profileImage,
        @NotBlank Integer following,
        @NotNull Integer subscribers,
        @NotNull Integer followingGroups,
        Integer createdPosts,
        String email //TODO necessary field
) {
}
