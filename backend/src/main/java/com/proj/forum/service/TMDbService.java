package com.proj.forum.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.proj.forum.pojo.MoviePOJO;
import com.proj.forum.pojo.MoviesResponse;

import java.util.List;

public interface TMDbService {
    List<MoviePOJO> getMoviesByYear(Integer year) throws JsonProcessingException;
}
