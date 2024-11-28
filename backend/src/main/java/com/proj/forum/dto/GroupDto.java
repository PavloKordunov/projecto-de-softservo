package com.proj.forum.dto;

import java.util.UUID;

public record GroupDto(
        UUID id,
        String title
) {
}
