package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

import java.util.UUID;

@Builder
public record UserRequestDto(
        UUID id,
        String image,
        @NotBlank(message = "Name cannot be blank")
        String firstName,
        @NotBlank(message = "Username cannot be blank")
        String nickName,
        @NotBlank(message = "Email cannot be blank")
        String email

) {
}
