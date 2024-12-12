package com.proj.forum.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class DbNotResponseException extends RuntimeException{
    public DbNotResponseException(String message) {
        super(message);
    }

    public DbNotResponseException(String message, Throwable cause) {
        super(message, cause);
    }

    public DbNotResponseException() { super();
    }
}
