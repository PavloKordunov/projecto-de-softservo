package com.proj.forum.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class CustomSuperException extends RuntimeException {

    private final boolean success;
    private final HttpStatus statusCode;
    private final String message;

    public CustomSuperException(boolean success, HttpStatus statusCode, String message) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.success = success;
    }
}
