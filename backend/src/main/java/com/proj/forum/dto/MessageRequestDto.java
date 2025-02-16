package com.proj.forum.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

public record MessageRequestDto(
        @Setter @Getter String content,
        @Setter @Getter UUID chatRoomId
) {
}
