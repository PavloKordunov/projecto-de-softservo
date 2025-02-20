package com.proj.forum.dto;

public record UserUpdateDto(
        String nickName,
        String firstName,
        String profileImage
) {
}
