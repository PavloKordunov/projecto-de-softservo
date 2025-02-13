package com.proj.forum.dto;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record StatisticDto(
        @Id UUID id,
        @NotNull UUID userId,
        @NotNull UUID objectId,
        Short rate,
        Boolean liked,
        @NotNull Boolean saved
        ) { }
