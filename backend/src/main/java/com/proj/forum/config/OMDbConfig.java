package com.proj.forum.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "omdb.api")
public class OMDbConfig {
    private String key;
    private String url;

}
