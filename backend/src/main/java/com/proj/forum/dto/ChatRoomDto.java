package com.proj.forum.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Builder
public record ChatRoomDto(
        UUID id,
        String name,
        @Setter @Getter Set<UUID> userIds) {
}
