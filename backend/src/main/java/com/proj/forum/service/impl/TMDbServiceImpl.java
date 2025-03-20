package com.proj.forum.service.impl;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.proj.forum.config.TMDbConfig;
import com.proj.forum.pojo.MoviePOJO;
import com.proj.forum.pojo.MoviesResponse;
import com.proj.forum.service.TMDbService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
@AllArgsConstructor
@Transactional("h2TransactionManager")
public class TMDbServiceImpl implements TMDbService {

    private final TMDbConfig tmdbConfig;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final ExecutorService executorService = Executors.newFixedThreadPool(20);

    @Override
    public List<MoviePOJO> getMoviesByYear(Integer year) {
        List<MoviePOJO> allMovies = new ArrayList<>();
        List<CompletableFuture<MoviesResponse>> futures = new ArrayList<>();
        int currentPage = 1, totalPages = 0;

        do {
            int finalPage = currentPage;
            CompletableFuture<MoviesResponse> future = getMoviesResponseCompletableFuture(year, finalPage);

            futures.add(future);
            totalPages = getTotalPages(currentPage, future, allMovies, totalPages);

            currentPage++;
        } while (currentPage <= totalPages);


        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
        futures.forEach(future -> allMovies.addAll(future.join().getResults()));

        return allMovies;
    }

    private static int getTotalPages(int currentPage, CompletableFuture<MoviesResponse> future, List<MoviePOJO> allMovies, int totalPages) {
        if (currentPage == 1) {
            MoviesResponse firstPageMovies = future.join();
            if (firstPageMovies != null) {
                allMovies.addAll(firstPageMovies.getResults());
                totalPages = firstPageMovies.getTotal_pages();
            }
        }
        return totalPages;
    }

    private CompletableFuture<MoviesResponse> getMoviesResponseCompletableFuture(Integer year, int finalPage) {
        return CompletableFuture.supplyAsync(() -> {
            String url = String.format("%s?api_key=%s&primary_release_year=%d&page=%d",
                    tmdbConfig.getUrl(), tmdbConfig.getKey(), year, finalPage);
            try {
                String jsonResponse = restTemplate.getForObject(url, String.class);
                return objectMapper.readValue(jsonResponse, MoviesResponse.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }, executorService);
    }

}
