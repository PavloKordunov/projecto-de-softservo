package com.proj.forum.service;

import com.proj.forum.dto.StatisticDto;

import java.util.List;
import java.util.UUID;

public interface UserStatisticService {
    StatisticDto likePost(StatisticDto statisticDto);
    StatisticDto savePost(StatisticDto statisticDto);
    StatisticDto rateTopic(StatisticDto statisticDto);

//void updateStatistic(StatisticDto statisticDto);
//
//    List<StatisticDto> getAllStatistic();
//
//    List<StatisticDto> getAllStatisticByUserId(UUID userId);
//
//    void deleteStatistic(UUID id);
//
//    void updateStatisticPartially(UUID id, Boolean liked);
}
