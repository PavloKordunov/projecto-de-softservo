package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

import java.util.UUID;

@Builder
public record UserDto(
        UUID id,
        @NotBlank(message = "Name cannot be blank")String name,
        @NotBlank(message = "Username cannot be blank")String username,
        String email
) {
}
