package com.proj.forum.dto;

import lombok.Builder;

@Builder
public record UserUpdateDto(
        String nickName,
        String firstName,
        String profileImage
) {
}
