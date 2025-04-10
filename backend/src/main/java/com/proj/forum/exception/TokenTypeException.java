package com.proj.forum.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class TokenTypeException extends RuntimeException {
    public TokenTypeException(String message) {
        super(message);
    }
}
