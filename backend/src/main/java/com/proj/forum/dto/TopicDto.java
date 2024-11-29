package com.proj.forum.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


public record TopicDto(
        UUID id,
        @Getter @Setter String title,
        @Getter @Setter String description
) {
}
