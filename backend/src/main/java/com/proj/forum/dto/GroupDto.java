package com.proj.forum.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
public record GroupDto(
        UUID id,
        String title,
        String description
) {
}
