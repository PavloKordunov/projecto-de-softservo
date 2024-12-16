package com.proj.forum.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record TagDto(
        UUID id,
        String name
) {
}
