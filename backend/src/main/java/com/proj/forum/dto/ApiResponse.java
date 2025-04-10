package com.proj.forum.dto;

import org.springframework.http.HttpStatusCode;

import java.util.UUID;

public record ApiResponse<T>(
        boolean success,
        HttpStatusCode status,
        String message,
        T body) {

    public static ApiResponse<GenericResponse> apiResponse(
            boolean success, int statusCode, String message, UUID id) {
        return new ApiResponse<>(success, HttpStatusCode.valueOf(statusCode), message, new GenericResponse(id));
    }
}
