package com.proj.forum.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

public record MessageRequestDto(
         @Getter String content,
         @Getter UUID chatRoomId
) {
}
