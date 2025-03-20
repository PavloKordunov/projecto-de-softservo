package com.proj.forum.exception;

import com.fasterxml.jackson.core.JsonProcessingException;

public class JsonCastException extends RuntimeException {
    public JsonCastException(String errorProcessingJson, JsonProcessingException e) {
    }
}
