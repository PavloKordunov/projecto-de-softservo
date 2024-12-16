package com.proj.forum.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.UUID;

@JsonSerialize
public class GenericResponse {

    @JsonSerialize private UUID id;
    @JsonSerialize private String message;

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
