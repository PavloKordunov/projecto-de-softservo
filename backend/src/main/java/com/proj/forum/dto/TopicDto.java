package com.proj.forum.dto;

import com.proj.forum.enums.TopicType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record TopicDto(
        UUID id,
        UUID tag_id,
        @NotBlank(message = "Title cannot be blank") String title,
        @NotNull UUID author,
        @NotNull Integer limitAge, //TODO create enum
        @NotBlank String description,
        @NotBlank String country,
        @NotBlank String duration,
        @NotBlank String genre,
        @NotBlank String IMDB,
        @NotBlank String actor,
        @NotBlank String director,
        @NotBlank String image,
        @NotNull TopicType topicType,
        int viewCount,
        List<CommentDto> comments
) {
}
