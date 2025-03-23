package com.proj.forum.service.impl;


import com.proj.forum.dto.MovieDto;
import com.proj.forum.h2.model.Movie;
import com.proj.forum.h2.repository.MovieRepository;
import com.proj.forum.pojo.MoviePOJO;
import com.proj.forum.service.MovieService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional("h2TransactionManager")
@AllArgsConstructor
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;

    @Override
    public List<MovieDto> saveMovies(List<MoviePOJO> moviePOJOS) {
        if (moviePOJOS == null)
            throw new EntityNotFoundException("Movies not found");

        List<Movie> movieList = moviePOJOS.stream()
                .map(MovieServiceImpl::getMovieModel).toList();

        List<Movie> movies = movieRepository.saveAll(movieList);
        return getMovieDtoList(movies);
    }

    @Override
    public List<MovieDto> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        return getMovieDtoList(movies);
    }

    @Override
    public List<MovieDto> getMoviesByMonth(Integer year, Integer month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

        List<Movie> movies = movieRepository.findByReleaseDateBetweenAndLanguageContaining(startDate.toString(), endDate.toString(), "en");
        return getMovieDtoList(movies);
    }

    private static Movie getMovieModel(MoviePOJO moviePOJO) {
        return Movie.builder()
                .title(moviePOJO.getTitle())
                .releaseDate(moviePOJO.getReleaseDate())
                .description(moviePOJO.getDescription())
                .language(moviePOJO.getLanguage())
                .rating(moviePOJO.getRating())
                .posterPath(moviePOJO.getPosterPath())
                .backdropPath(moviePOJO.getBackdropPath())
                .build();
    }

    private static List<MovieDto> getMovieDtoList(List<Movie> movies) {
        return movies.stream()
                .map(MovieServiceImpl::mapToMovieDto)
                .toList();
    }

    private static MovieDto mapToMovieDto(Movie movie) {
        return MovieDto.builder()
                .title(movie.getTitle())
                .releaseDate(movie.getReleaseDate())
                .language(movie.getLanguage())
                //.description(movie.getDescription())
                .build();
    }
}
