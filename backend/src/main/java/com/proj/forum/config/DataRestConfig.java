package com.proj.forum.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PUT,
                HttpMethod.PATCH,
                HttpMethod.DELETE};

        config.exposeIdsFor(Object.class);

        config.getExposureConfiguration()
                .forDomainType(Object.class)
                .withItemExposure((metadata, httpMethods) ->
                        httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metadata, httpMethods) ->
                        httpMethods.disable(unsupportedActions));

        cors.addMapping(config.getBasePath()+ "/**")
                .allowedOrigins("https://localhost:3000");

    }
}
