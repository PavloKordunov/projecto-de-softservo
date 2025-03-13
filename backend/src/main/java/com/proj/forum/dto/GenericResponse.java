package com.proj.forum.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;

import java.util.UUID;

@JsonSerialize
@AllArgsConstructor
public class GenericResponse {

    @JsonSerialize private UUID id; //TODO investigate
    @JsonSerialize private String message;

    public GenericResponse(UUID id) {
        this.id = id;
    }

    public GenericResponse(String message) {
        this.message = message;
    }
}
