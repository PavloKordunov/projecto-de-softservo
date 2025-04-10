package com.proj.forum.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
public class GenericResponse {

    private UUID id;
    private String message;

    public GenericResponse(UUID id) {
        this.id = id;
    }
}
