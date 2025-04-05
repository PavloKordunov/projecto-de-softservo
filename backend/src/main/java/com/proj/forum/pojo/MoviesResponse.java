package com.proj.forum.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class MoviesResponse {
    private int page;
    private List<MoviePOJO> results;
    private int total_pages;
}