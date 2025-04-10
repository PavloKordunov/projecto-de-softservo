package com.proj.forum.dto;

import org.springframework.http.HttpStatusCode;

public record ListResponse<T>(
        boolean success,
        HttpStatusCode status,
        String message,
        int count,
        T body) {
}
