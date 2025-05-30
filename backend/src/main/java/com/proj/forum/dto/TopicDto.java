package com.proj.forum.dto;

import com.proj.forum.enums.TopicType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Builder
public record TopicDto(
        UUID id,
        List<TagDto> tagDtos,
        List<UUID> tagsId,
        @NotBlank(message = "Title cannot be blank") String title,
        @NotNull UUID author,
        @NotNull String limitAge,
        @NotBlank String description,
        @NotBlank String country,
        @NotBlank String duration,
        @NotBlank String genre,
        @NotBlank String IMDB,
        @NotBlank String actor,
        @NotBlank String director,
        @NotBlank String image,
        @NotNull TopicType topicType,
        String trailerURL,
        UUID groupId,
        String releaseDate,
        LocalDate responseReleaseDate,
        int viewCount,
        Double userRate,
        int userRateCount,
        List<CommentDto> comments,
        Short myRate
) {
}
