package com.proj.forum.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum RoleType {
    ADMIN(0, "Admin"),
    USER(1, "Everyone");

    private final int key;
    private final String value;
}
