package com.proj.forum.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;;

@Getter
@AllArgsConstructor
public enum MessageStatus {
    RECEIVED(0, "Received"),
    DELIVERED(1, "Delivered"),
    FAILED(2, "Failed");

    private final int key;
    private final String value;

}
