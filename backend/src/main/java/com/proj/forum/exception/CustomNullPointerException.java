package com.proj.forum.exception;

import org.springframework.http.HttpStatusCode;

public class CustomNullPointerException extends CustomSuperException{
    public CustomNullPointerException(boolean success, HttpStatusCode statusCode, String message) {
        super(success, statusCode, message);
    }

}
