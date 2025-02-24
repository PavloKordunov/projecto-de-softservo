package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record GroupDto(
        UUID id,
        @NotBlank(message = "Title cannot be blank")
        String title,
        @NotNull
        @Length(max = 500)
        String description,
        String image,
        @NotNull UUID userId,
        LocalDateTime createdAt,
        Integer memberCount,
        Integer postCount,
        @NotNull boolean isPublic
) {
}
