package com.proj.forum.controller;

import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.StatisticDto;
import com.proj.forum.service.UserStatisticService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-statistic")
@CrossOrigin("http://localhost:3000")
public class UserStatisticController {

    private final UserStatisticService userStatisticService;
    //private final UserService userService;

    @PostMapping("/new")
    public ApiResponse<StatisticDto> createStatistic(@RequestBody @Valid StatisticDto statisticDto)
    {
        log.info("Create new statistic");
        StatisticDto newStatisticDto = userStatisticService.createStatistic(statisticDto);
        return new ApiResponse<>(true, HttpStatus.CREATED, "Statistic create successfully", newStatisticDto);
    }

    @GetMapping("/all")
    public ApiResponse<List<StatisticDto>> getAllStatistic(){
        log.info("Get all statistics");
        List<StatisticDto> statisticDto = userStatisticService.getAllStatisticDto();

        return new ApiResponse<>(true, HttpStatus.OK, "Statistic is returned", statisticDto);
    }

    @GetMapping("/all/user/{id}")
    public ApiResponse<List<StatisticDto>> getAllStatisticByUserId(@PathVariable @Valid UUID id){
        log.info("Get all statistics by user id");
        List<StatisticDto> statisticDto = userStatisticService.getAllStatisticDtoByUserId(id);

        return new ApiResponse<>(true, HttpStatus.OK, "Statistic is returned", statisticDto);
    }

//    @GetMapping("/all/user-saved/{id}")
//    public ApiResponse<List<StatisticDto>> getAllStatistcByUserId(@PathVariable @Valid UUID id){
//        log.info("Get all statistics user saved by user id");
//        List<StatisticDto> statisticDto = userStatisticService.getAllStatisticDtoByUserId(id);
//
//        return new ApiResponse<>(true, HttpStatus.OK, "Statistic is returned", statisticDto);
//    }


    @PutMapping
    public ApiResponse<GenericResponse> updateStatistic(@RequestBody @Valid StatisticDto statisticDto){
        log.info("Update statistic");
        userStatisticService.updateStatisticDto(statisticDto);
        return new ApiResponse<>(true, HttpStatus.OK, "Statistic update successfully", new GenericResponse(statisticDto.id()));
    }

}
