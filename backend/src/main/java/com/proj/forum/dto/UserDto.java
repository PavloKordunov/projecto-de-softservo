package com.proj.forum.dto;

import java.util.UUID;

public record UserDto(
        UUID id, //utilise nickname
        String name
) {
}
