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

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-statistic")
@CrossOrigin("http://localhost:3000")
public class UserStatisticController {

    private final UserStatisticService userStatisticService;
    //private final UserService userService;

    @GetMapping
    public ApiResponse<List<?>> getAllStatistic(){
        List<?> statistic = new ArrayList<>();

        return new ApiResponse<>(true, HttpStatus.OK, "Statistic is returned", statistic);
    }

    @PostMapping("/new")
    public ApiResponse<StatisticDto> createStatistic(@RequestBody @Valid StatisticDto statisticDto)
    {
        log.info("Create new statistic");
        StatisticDto newStatisticDto = userStatisticService.createStatistic(statisticDto);
        return new ApiResponse<>(true, HttpStatus.CREATED, "Statistic create successfully", newStatisticDto);
    }

    @PatchMapping
    public ApiResponse<GenericResponse> updateStatistic(@RequestBody @Valid StatisticDto statisticDto){
        log.info("Update statistic");
        userStatisticService.updateStatistic(statisticDto);
        return new ApiResponse<>(true, HttpStatus.OK, "Statistic update successfully", new GenericResponse(statisticDto.id()));
    }

}
