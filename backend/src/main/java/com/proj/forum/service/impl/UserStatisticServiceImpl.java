package com.proj.forum.service.impl;

import com.proj.forum.dto.StatisticDto;
import com.proj.forum.entity.Statistic;
import com.proj.forum.repository.UserStatisticRepository;
import com.proj.forum.service.UserStatisticService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserStatisticServiceImpl implements UserStatisticService {

    private final UserStatisticRepository userStatisticRepository;

    @Override
    public StatisticDto createStatistic(StatisticDto statisticDto) {
        Statistic statistic = mapToStatistic(statisticDto);
        Statistic createdStatistic = userStatisticRepository.save(statistic);
        return mapToStatisticDto(createdStatistic);
    }

    @Override
    public void updateStatistic(StatisticDto statisticDto) {
        //TODO update
    }

    private static StatisticDto mapToStatisticDto(Statistic statistic) {
        return StatisticDto.builder()
                .id(statistic.getId())
                .userId(statistic.getUserId())
                .topicId(statistic.getTopicId())
                .rate(statistic.getRate())
                .liked(statistic.isLiked())
                .saved(statistic.isSaved())
                .build();
    }

    private static Statistic mapToStatistic(StatisticDto dto){
        return Statistic.builder()
                .userId(dto.userId())
                .topicId(dto.topicId())
                .rate(dto.rate())
                .liked(dto.liked())
                .saved(dto.saved())
                .build();
    }
}
