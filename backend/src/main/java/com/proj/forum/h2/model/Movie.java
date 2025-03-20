package com.proj.forum.h2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "Movie")
public class Movie {
    @Id
    @GeneratedValue
    private UUID id;

    private String title;
    private String releaseDate;
    @Lob
    private String description;
    private String language;
    private Double rating;
    private String posterPath;
    private String backdropPath;
}
