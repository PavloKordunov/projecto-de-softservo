package com.proj.forum.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserAlreadySubscribeException extends RuntimeException{
    public UserAlreadySubscribeException(String message) {
        super(message);
    }
    public UserAlreadySubscribeException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserAlreadySubscribeException() { super();
    }
}
