package com.proj.forum.service;

import com.proj.forum.pojo.MoviesResponse;

public interface TMDbService {
    MoviesResponse getMoviesByYear(Integer year);
}
