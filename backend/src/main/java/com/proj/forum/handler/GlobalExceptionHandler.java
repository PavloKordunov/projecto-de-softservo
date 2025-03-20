package com.proj.forum.handler;

import com.proj.forum.dto.ApiResponse;
import com.proj.forum.exception.JsonCastException;
import com.proj.forum.exception.TokenTypeException;
import com.proj.forum.exception.TooManyRetryRequestException;
import com.proj.forum.exception.UserAlreadySubscribeException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.security.sasl.AuthenticationException;
import java.nio.file.AccessDeniedException;
import java.sql.SQLException;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler{

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    @ExceptionHandler(value = {EntityNotFoundException.class})
    public ApiResponse<?> handleEntityNotFound(RuntimeException ex) {
        return new ApiResponse<>(true, HttpStatus.NOT_FOUND, ex.getMessage(), null);
    }

    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(value = SQLException.class)
    public ApiResponse<?> handleSqlDb(RuntimeException ex) {
        return new ApiResponse<>(false, HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), null);
    }
//
//    @ExceptionHandler(value = DataIntegrityViolationException.class)
//    public ApiResponse<?> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
//        return new ApiResponse<>(false, HttpStatus.CONFLICT, ex.getCause().toString(), null);
//    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {MethodArgumentTypeMismatchException.class,
                                UserAlreadySubscribeException.class,
                                IllegalArgumentException.class})  // <--?
    public ApiResponse<?> handleMethodNotValid(RuntimeException ex){
        return new ApiResponse<>(false, HttpStatus.BAD_REQUEST, ex.getCause().toString(), null);
    }

    @ResponseStatus(value =  HttpStatus.FORBIDDEN)
    @ExceptionHandler(value = {AccessDeniedException.class})
    public ApiResponse<?> handleAccessDenied(RuntimeException ex){
        return new ApiResponse<>(false, HttpStatus.FORBIDDEN, ex.getCause().toString(), null);
    }

    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value = {TokenTypeException.class, AuthenticationException.class})
    public ApiResponse<?> handleAuthentication(RuntimeException ex){
        return new ApiResponse<>(false, HttpStatus.UNAUTHORIZED, ex.getMessage(), null);
    }

    @ResponseStatus(value = HttpStatus.TOO_MANY_REQUESTS)
    @ExceptionHandler(value = TooManyRetryRequestException.class)
    public ApiResponse<?> handleRetryRequest(RuntimeException ex){
        return new ApiResponse<>(false, HttpStatus.TOO_MANY_REQUESTS, ex.getMessage(), null);
    }

    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler(value = JsonCastException.class)
    public ApiResponse<?> handleBadJsonConvert(RuntimeException ex){
        return new ApiResponse<>(false, HttpStatus.UNPROCESSABLE_ENTITY, ex.getMessage(), null);
    }


    //    @ExceptionHandler(JDBCConnectionException.class)
    //    public ApiResponse<?> handleDisconnectDb(RuntimeException ex) {
    //        return new ApiResponse<>(false, HttpStatus.SERVICE_UNAVAILABLE, ex.getCause().toString(), null);
}
