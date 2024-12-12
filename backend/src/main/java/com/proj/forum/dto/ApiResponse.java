package com.proj.forum.dto;

import org.springframework.http.HttpStatusCode;

public record ApiResponse<T>(
        boolean success,
        HttpStatusCode status,
        String message,
        T body) {
}
