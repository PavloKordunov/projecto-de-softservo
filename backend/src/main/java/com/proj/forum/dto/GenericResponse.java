package com.proj.forum.dto;

import java.util.UUID;


public class GenericResponse {
    private UUID id;
    private String message;

    public GenericResponse(UUID id, String message) {
        this.id = id;
        this.message = message;
    }

    public GenericResponse(UUID id) {
        this.id = id;
    }

    public GenericResponse(String message) {
        this.message = message;
    }
}
