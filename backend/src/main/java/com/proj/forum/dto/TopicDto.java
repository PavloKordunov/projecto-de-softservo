package com.proj.forum.dto;

import com.proj.forum.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

import java.util.UUID;

@Builder
public record TopicDto(
        UUID id,
        UUID tag_id,
        @NotBlank(message = "Title cannot be blank") String title,
        UUID author,
        Integer limitAge,
        String description,
        String country,
        String duration,
        String genre,
        String IMDB,
        String actor,
        String director,
        String image,
        int viewCount
) {
}
