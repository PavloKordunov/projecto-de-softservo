//package com.proj.forum.config;
//
//import com.proj.forum.entity.Topic;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
//import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
//import org.springframework.http.HttpMethod;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//
//@Configuration
//public class DataRestConfig implements RepositoryRestConfigurer {
//
//    @Override
//    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
//        HttpMethod[] unsupportedActions = {
//                HttpMethod.POST,
//                HttpMethod.PUT,
//                HttpMethod.PATCH,
//                HttpMethod.DELETE};
//
//        config.exposeIdsFor(Topic.class);
//
//        config.getExposureConfiguration()
//                .forDomainType(Topic.class)
//                .withItemExposure((metadata, httpMethods) ->
//                        httpMethods.disable(unsupportedActions))
//                .withCollectionExposure((metadata, httpMethods) ->
//                        httpMethods.disable(unsupportedActions));
//
//        cors.addMapping(config.getBasePath()+ "/**")
//                .allowedOrigins("http://localhost:3000");
//
//    }
//}
