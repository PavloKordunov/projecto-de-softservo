package com.proj.forum.enums;

import lombok.Getter;;

@Getter
public enum MessageStatus {
    RECEIVED(0, "Received"),
    DELIVERED(1, "Delivered"),
    FAILED(2, "Failed");

    private final int key;
    private final String value;

    MessageStatus(int key, String value) {
        this.key = key;
        this.value = value;
    }

}
