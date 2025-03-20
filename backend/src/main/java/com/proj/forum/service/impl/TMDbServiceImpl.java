package com.proj.forum.service.impl;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.proj.forum.config.TMDbConfig;
import com.proj.forum.pojo.MoviesResponse;
import com.proj.forum.service.TMDbService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
@AllArgsConstructor
@Transactional("h2TransactionManager")
public class TMDbServiceImpl implements TMDbService {

    private final TMDbConfig tmdbConfig;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Override
    public MoviesResponse getMoviesByYear(Integer year) {
        String url = String.format("%s?api_key=%s&primary_release_year=%s",
                tmdbConfig.getUrl(),
                tmdbConfig.getKey(),
                year);
        String jsonResponse = restTemplate.getForObject(url, String.class);

        try {
            MoviesResponse response = objectMapper.readValue(jsonResponse, MoviesResponse.class);
            if (response != null && response.getResults() != null)
                return response;
            else
                return new MoviesResponse();
        } catch (JacksonException e) {
            throw new RuntimeException(e);
        }
    }
}
