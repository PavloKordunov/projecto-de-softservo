package com.proj.forum.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
public class TooManyRetryRequestException extends RuntimeException {
    public TooManyRetryRequestException(String message) {
        super(message);
    }
}
