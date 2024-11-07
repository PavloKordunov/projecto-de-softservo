package com.proj.forum.dto;

import java.util.UUID;

public record TopicDto(
        UUID id,
        String title
) {
}
