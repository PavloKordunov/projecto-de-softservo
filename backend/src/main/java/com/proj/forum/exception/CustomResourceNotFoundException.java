package com.proj.forum.exception;

import org.springframework.http.HttpStatusCode;

public class CustomResourceNotFoundException extends CustomSuperException {
    public CustomResourceNotFoundException(boolean success, HttpStatusCode statusCode, String message) {
        super(success, statusCode, message);
    }
}
