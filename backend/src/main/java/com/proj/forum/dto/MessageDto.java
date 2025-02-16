package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record MessageDto(
        UUID id,
        String content,
        UUID senderId,
        String senderName,
        @Setter @Getter UUID chatRoomId,
        LocalDateTime timestamp
) {
}
