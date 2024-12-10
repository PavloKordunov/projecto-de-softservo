package com.proj.forum.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UserDto(
        UUID id, //utilise username
        String name,
        String username
) {
}
