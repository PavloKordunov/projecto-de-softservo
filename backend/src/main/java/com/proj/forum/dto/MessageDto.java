package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record MessageDto(
        UUID id,
        @NotNull UUID senderID,
        @NotNull UUID recipientId,
        @NotBlank String content,
        LocalDateTime timestamp,
        Boolean readStatus
) {
}
