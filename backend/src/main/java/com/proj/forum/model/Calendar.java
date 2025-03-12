package com.proj.forum.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity
public class Calendar {
    @Id
    private UUID id;
}
