package com.proj.forum.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvConfig {

    @Bean
    public Dotenv loadEnv() {
        Dotenv dotenv = Dotenv.configure()
                .directory("backend/src/main/resources")
                .load();
        dotenv.entries().forEach(entry ->
                System.setProperty(entry.getKey(), entry.getValue())
        );
        return dotenv;
    }
}
