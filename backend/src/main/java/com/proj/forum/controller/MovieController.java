package com.proj.forum.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.proj.forum.annotation.Logging;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.MovieDto;
import com.proj.forum.pojo.MoviePOJO;
import com.proj.forum.service.MovieService;
import com.proj.forum.service.TMDbService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Logging
@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
@CrossOrigin("https://localhost:3000")
public class MovieController {

    private final MovieService movieService;
    private final TMDbService tmDbService;

    @GetMapping("/year/{year}")
    public ApiResponse<?> fetchMoviesFromApiByYear(@PathVariable Integer year) throws JsonProcessingException {
        List<MoviePOJO> moviesByYear = tmDbService.getMoviesByYear(year);
        List<MovieDto> response = movieService.saveMovies(moviesByYear);
        return new ApiResponse<>(true, HttpStatus.OK, "Get movies from API", response);
    }

    @GetMapping("/year/{year}/month/{month}")
    public ApiResponse<?> getMoviesByMonth(@PathVariable Integer year,
                                           @PathVariable @Min(1) @Max(12) Integer month) {
        List<MovieDto> movies = movieService.getMoviesByMonth(year, month);
        return new ApiResponse<>(true, HttpStatus.OK, "Get movies by month successful", movies);
    }

    @GetMapping("/all")
    public ApiResponse<?> getAllMovies(){
        List<MovieDto> movies = movieService.getAllMovies();
        return new ApiResponse<>(true, HttpStatus.OK, "Get all movies successful", movies);
    }

}
