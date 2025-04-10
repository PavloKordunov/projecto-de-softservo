package com.proj.forum.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.web.client.RestTemplate;

@Data
@Configuration
@DependsOn("loadEnv")
@ConfigurationProperties(prefix = "tmdb.api")
public class TMDbConfig {
    private String key;
    private String url;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
