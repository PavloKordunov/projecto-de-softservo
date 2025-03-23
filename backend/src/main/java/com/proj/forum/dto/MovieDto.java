package com.proj.forum.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MovieDto(
        @NotNull String title,
        @NotNull String releaseDate,
        String language
        //String description
) {
}
