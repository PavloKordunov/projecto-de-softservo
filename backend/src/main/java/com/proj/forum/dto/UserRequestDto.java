package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

import java.util.UUID;

@Builder
public record UserRequestDto(
        UUID id,
        @NotBlank(message = "Name cannot be blank")String firstName,
        @NotBlank(message = "Username cannot be blank")String nickName,
        String email
) {
}
