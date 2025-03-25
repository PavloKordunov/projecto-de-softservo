package com.proj.forum.service.impl;

import com.proj.forum.dto.StatisticDto;
import com.proj.forum.entity.Statistic;
import com.proj.forum.repository.UserStatisticRepository;
import com.proj.forum.service.UserStatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;


@Service
@Transactional("postgreTransactionManager")
@RequiredArgsConstructor
public class UserStatisticServiceImpl implements UserStatisticService {

    private final UserStatisticRepository userStatisticRepository;

    @Override
    public StatisticDto likePost(StatisticDto statisticDto) {
        if (userStatisticRepository.existsByObjectIdAndUserId(statisticDto.objectId(), statisticDto.userId())) {
            Statistic statistic = userStatisticRepository.getStatisticByObjectIdAndUserId(statisticDto.objectId(), statisticDto.userId()).get();

            if (statisticDto.liked() != statistic.getLiked())
                statistic.setLiked((statisticDto.liked()));

            if (statistic.getLiked() == null && !statistic.getSaved() && statistic.getRate() == null) {
                userStatisticRepository.deleteById(statistic.getId());
                return statisticDto;
            }
            userStatisticRepository.save(statistic);
            return statisticDto;
        } else {
            Statistic statistic = Statistic.builder()
                    .userId(statisticDto.userId())
                    .objectId(statisticDto.objectId())
                    .liked(statisticDto.liked())
                    .saved(false)
                    .build();
            userStatisticRepository.save(statistic);
            return statisticDto;
        }
    }

//    @Override
//    public StatisticDto interactWithPost(StatisticDto statisticDto) {
//        if(userStatisticRepository.existsByObjectIdAndUserId(statisticDto.objectId(), statisticDto.userId())){
//            Statistic statistic = userStatisticRepository.getStatisticByUserIdAndObjectId(statisticDto.objectId(), statisticDto.userId());
//
//            Statistic updatedStat = updateStatistic(statistic, statisticDto);
//
//            if(updatedStat.getLiked() == null && !updatedStat.getSaved() && updatedStat.getRate() == null){
//                userStatisticRepository.deleteById(statistic.getId());
//                return statisticDto;
//            }
//            userStatisticRepository.save(statistic);
//            return statisticDto;
//        } else {
//            Statistic statistic = Statistic.builder()
//                    .userId(statisticDto.userId())
//                    .objectId(statisticDto.objectId())
//                    .liked(statisticDto.liked())
//                    .saved(false)
//                    .build();
//            userStatisticRepository.save(statistic);
//            return statisticDto;
//        }
//    }

    @Override
    public StatisticDto savePost(StatisticDto statisticDto) {
        if (userStatisticRepository.existsByObjectIdAndUserId(statisticDto.objectId(), statisticDto.userId())) {
            Statistic statistic = userStatisticRepository.getStatisticByObjectIdAndUserId(statisticDto.objectId(), statisticDto.userId()).get();
            if (statisticDto.saved() != statistic.getSaved() && statisticDto.saved() != null)
                statistic.setSaved(statisticDto.saved());

            if (statistic.getLiked() == null && Boolean.FALSE.equals(statistic.getSaved()) && statistic.getRate() == null) {
                userStatisticRepository.deleteById(statistic.getId());
                return statisticDto;
            }
            userStatisticRepository.save(statistic);
            return statisticDto;
        } else {
            Statistic statistic = Statistic.builder()
                    .userId(statisticDto.userId())
                    .objectId(statisticDto.objectId())
                    .saved(statisticDto.saved())
                    .build();
            userStatisticRepository.save(statistic);
            return statisticDto;
        }
    }

    @Override
    public StatisticDto rateTopic(StatisticDto statisticDto) {
        if (userStatisticRepository.existsByObjectIdAndUserId(statisticDto.objectId(), statisticDto.userId())) {
            Statistic statistic = userStatisticRepository.getStatisticByObjectIdAndUserId(statisticDto.objectId(), statisticDto.userId()).get();

            if (!Objects.equals(statisticDto.rate(), statistic.getRate()))
                statistic.setRate(statisticDto.rate());

            if (statistic.getLiked() == null && !statistic.getSaved() && statistic.getRate() == null) {
                userStatisticRepository.deleteById(statistic.getId());
                return statisticDto;
            }
            userStatisticRepository.save(statistic);
            return statisticDto;
        } else {
            Statistic statistic = Statistic.builder()
                    .userId(statisticDto.userId())
                    .objectId(statisticDto.objectId())
                    .rate(statisticDto.rate())
                    .build();
            userStatisticRepository.save(statistic);
            return statisticDto;
        }
    }


//    @Override
//    public void updateStatistic(StatisticDto statisticDto) {
//        userStatisticRepository.findById(statisticDto.id())
//                .map(stat -> updateStatistic(stat, statisticDto))
//                .orElseThrow(() -> new EntityNotFoundException("Statistic not found"));
//    }

    //    @Override
//    public List<StatisticDto> getAllStatistic() {
//        List<Statistic> statisticList = userStatisticRepository.findAll();
//        return getDtoList(statisticList);
//    }
//
//    @Override
//    public List<StatisticDto> getAllStatisticByUserId(UUID userId) {
//        List<Statistic> statisticList = userStatisticRepository.findByUserId(userId);
//        return getDtoList(statisticList);
//    }
//
//    @Override
//    public void deleteStatistic(UUID id) {
//        if (userStatisticRepository.existsById(id))
//            userStatisticRepository.deleteById(id);
//        else
//            throw new EntityNotFoundException("Statistic not found");
//    }
//
//    @Override
//    public void updateStatisticPartially(UUID id, Boolean liked) {
//        userStatisticRepository.findById(id).map(statistic -> updatePartially(statistic, liked))
//                .orElseThrow(() -> new EntityNotFoundException("Statistic not found"));
//    }
//
//    private Statistic updateStatistic(Statistic statistic, StatisticDto statisticDto) {
//        if (statisticDto.liked() != statistic.getLiked()) {
//            statistic.setLiked(statisticDto.liked());
//        }
//        if (statisticDto.saved() != statistic.getSaved()) {
//            statistic.setSaved(statisticDto.saved());
//        }
//        if (!Objects.equals(statisticDto.rate(), statistic.getRate())) {
//            statistic.setRate(statisticDto.rate());
//        }
//        return statistic;
//    }
//
//    private Statistic updatePartially(Statistic statistic, Boolean liked) {
//        if (statistic.getLiked() != liked)
//            statistic.setLiked(liked);
//        return statistic;
//    }
//
//    private static StatisticDto mapToStatisticDto(Statistic statistic) {
//        return StatisticDto.builder()
//                .id(statistic.getId())
//                .userId(statistic.getUserId())
//                .id(statistic.getObjectId())
//                .rate(statistic.getRate())
//                .liked(statistic.getLiked())
//                .saved(statistic.getSaved())
//                .build();
//    }
//
//    private static Statistic mapToStatistic(StatisticDto dto) {
//        return Statistic.builder()
//                .userId(dto.userId())
//                .objectId(dto.objectId())
//                .rate(dto.rate())
//                .liked(dto.liked())
//                .saved(dto.saved())
//                .build();
//    }
//
//    private static List<StatisticDto> getDtoList(List<Statistic> statisticList) {
//        return statisticList.stream()
//                .map(UserStatisticServiceImpl::mapToStatisticDto)
//                .toList();
//    }
}
