package com.proj.forum.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class MoviePOJO {
    private int id;
    private String title;

    @JsonProperty("release_date")
    private String releaseDate;

    @JsonProperty("overview")
    private String description;

    @JsonProperty("original_language")
    private String language;

    @JsonProperty("vote_average")
    private double rating;

    @JsonProperty("poster_path")
    private String posterPath;

    @JsonProperty("backdrop_path")
    private String backdropPath;
}
