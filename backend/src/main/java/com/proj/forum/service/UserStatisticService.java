package com.proj.forum.service;

import com.proj.forum.dto.StatisticDto;

import java.util.List;
import java.util.UUID;

public interface UserStatisticService {
    StatisticDto createStatistic(StatisticDto statisticDto);

    void updateStatisticDto(StatisticDto statisticDto);

    List<StatisticDto> getAllStatisticDto();

    List<StatisticDto> getAllStatisticDtoByUserId(UUID userId);
}
