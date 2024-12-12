package com.proj.forum.exception;

import org.springframework.http.HttpStatus;

public class CustomNullPointerException extends CustomSuperException{
    public CustomNullPointerException(boolean success, HttpStatus statusCode, String message) {
        super(success, statusCode, message);
    }

}
