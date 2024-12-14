package com.proj.forum.controller;

import com.proj.forum.dto.ApiResponse;
import com.proj.forum.exception.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.sql.SQLException;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {EntityNotFoundException.class, ResourceNotFoundException.class})
    public ApiResponse<?> handleEntityNotFound(RuntimeException ex) {
        return new ApiResponse<>(true, HttpStatus.NOT_FOUND, ex.getCause().toString(), null);
    }

    @ExceptionHandler(value = SQLException.class)
    public ApiResponse<?> handleSqlDb(RuntimeException ex) {
        return new ApiResponse<>(false, HttpStatus.INTERNAL_SERVER_ERROR, ex.getCause().toString(), null);
    }

    @ExceptionHandler(value = DataIntegrityViolationException.class)
    public ApiResponse<?> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        return new ApiResponse<>(false, HttpStatus.CONFLICT, ex.getCause().toString(), null);
    }


    //    @ExceptionHandler(JDBCConnectionException.class)
    //    public ApiResponse<?> handleDisconnectDb(RuntimeException ex) {
    //        return new ApiResponse<>(false, HttpStatus.SERVICE_UNAVAILABLE, ex.getCause().toString(), null);
    //    }
    //    @ExceptionHandler(DbNotResponseException.class)
    //    public ApiResponse<?> handleDbError(RuntimeException ex){
    //        return new ApiResponse<>(false, HttpStatus.SERVICE_UNAVAILABLE, ex.getCause().toString(), null);
    //    }
}
