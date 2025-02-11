package com.proj.forum.dto;

import java.util.UUID;

public record UserUpdateDto(
        //UUID user_id,
        String username,
        String name,
        String profileImg
) {
}
