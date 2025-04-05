package com.proj.forum.service;

import com.proj.forum.dto.MovieDto;
import com.proj.forum.pojo.MoviePOJO;

import java.util.List;

public interface MovieService {
    List<MovieDto> saveMovies(List<MoviePOJO> moviePOJOS);
    List<MovieDto> getAllMovies();
    List<MovieDto> getMoviesByMonth(Integer year, Integer month);
}
