package com.proj.forum.service;

import com.proj.forum.dto.StatisticDto;

public interface UserStatisticService {
    StatisticDto createStatistic(StatisticDto statisticDto);

    void updateStatistic(StatisticDto statisticDto);
}
