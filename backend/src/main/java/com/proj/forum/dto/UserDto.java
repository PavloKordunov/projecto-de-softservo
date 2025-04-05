package com.proj.forum.dto;

import jakarta.validation.constraints.NotBlank;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UserDto(
        UUID id,
        @NotBlank(message = "Name cannot be blank") String nickName,
        @NotBlank(message = "Username cannot be blank") String firstName,
        @NotBlank(message = "Email cannot be blank") String email,
        String profileImage,
        Integer following,
        Integer subscribers,
        Integer followingGroups,
        Integer createdPosts
) {
}
