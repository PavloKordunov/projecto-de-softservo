package com.proj.forum.controller;

import com.proj.forum.dto.ApiResponse;
import com.proj.forum.exception.CustomNullPointerException;
import com.proj.forum.exception.CustomResourseNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomNullPointerException.class)
    public ApiResponse<?> handleNullPointer(CustomResourseNotFoundException ex) {
        return new ApiResponse<>(ex.isSuccess(), ex.getStatusCode(), ex.getMessage(), null);
    }

    @ExceptionHandler(CustomResourseNotFoundException.class)
    public ApiResponse<?> handleResourceNotFound(CustomResourseNotFoundException ex) {
        return new ApiResponse<>(ex.isSuccess(), ex.getStatusCode(), ex.getMessage(), null);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResponse<?> handleNotValid(MethodArgumentNotValidException ex)
    {
        return new ApiResponse<>(ex.hasErrors(), ex.getStatusCode(), ex.getMessage(), null);
    }
}
