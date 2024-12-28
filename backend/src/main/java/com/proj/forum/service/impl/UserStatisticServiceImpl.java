package com.proj.forum.service.impl;

import com.proj.forum.dto.StatisticDto;
import com.proj.forum.entity.Statistic;
import com.proj.forum.repository.UserStatisticRepository;
import com.proj.forum.service.UserStatisticService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

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

    @Transactional
    @Override
    public void updateStatisticDto(StatisticDto statisticDto) {
        StatisticDto statistic = userStatisticRepository.findById(statisticDto.id())
                .map(stat -> updateStatistic(stat, statisticDto))
                .orElseThrow(() -> new EntityNotFoundException("Not find statistic"));
        //userStatisticRepository.save(statistic);
    }

    private StatisticDto updateStatistic(Statistic statistic, StatisticDto statisticDto) {
        if (statisticDto.liked() != statistic.isLiked()) {
            statistic.setLiked(statisticDto.liked());
        }
        if (statisticDto.saved() != statistic.isSaved()) {
            statistic.setSaved(statisticDto.saved());
        }
        if (statisticDto.rate() != statistic.getRate()) {
            statistic.setRate(statisticDto.rate());
        }
        return statisticDto;
    }

    @Override
    public List<StatisticDto> getAllStatisticDto() {
        List<Statistic> statisticList = userStatisticRepository.findAll();
        return getDtoList(statisticList);
    }

    @Override
    public List<StatisticDto> getAllStatisticDtoByUserId(UUID userId) {
        List<Statistic> statisticList = userStatisticRepository.findByUserId(userId);
        return getDtoList(statisticList);
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

    private static Statistic mapToStatistic(StatisticDto dto) {
        return Statistic.builder()
                .userId(dto.userId())
                .topicId(dto.topicId())
                .rate(dto.rate())
                .liked(dto.liked())
                .saved(dto.saved())
                .build();
    }

    private static List<StatisticDto> getDtoList(List<Statistic> statisticList) {
        return statisticList.stream()
                .map(UserStatisticServiceImpl::mapToStatisticDto)
                .toList();
    }
}
