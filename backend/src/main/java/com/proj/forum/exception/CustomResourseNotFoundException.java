package com.proj.forum.exception;

import org.springframework.http.HttpStatus;

public class CustomResourseNotFoundException extends CustomSuperException {
    public CustomResourseNotFoundException(boolean success, HttpStatus statusCode, String message) {
        super(success, statusCode, message);
    }
}
