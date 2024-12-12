package com.proj.forum.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;

@Configuration
public class ExceptionConfig {
    @Bean
    public HandlerExceptionResolver customExceptionResolver() {
        return (request, response, handler, ex) -> {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            try {
                response.getWriter().write("Custom error handling");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return new ModelAndView();
        };
    }
}
