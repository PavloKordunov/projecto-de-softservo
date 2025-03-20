package com.proj.forum.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class JsonCastException extends RuntimeException {
    public JsonCastException(String errorProcessingJson) {
    }
}
