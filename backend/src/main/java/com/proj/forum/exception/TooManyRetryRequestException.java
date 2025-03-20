package com.proj.forum.exception;

public class TooManyRetryRequestException extends RuntimeException {
    public TooManyRetryRequestException(String message) {
        super(message);
    }
}
