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

    @GetMapping
    public ApiResponse<List<StatisticDto>> getAllStatistic(){
        log.info("Get all statistics");
        List<StatisticDto> statisticDto = userStatisticService.getAllStatistic();

        return new ApiResponse<>(true, HttpStatus.OK, "Statistic get successfully", statisticDto);
    }

    @GetMapping("/user/{id}")
    public ApiResponse<List<StatisticDto>> getAllStatisticByUserId(@PathVariable @Valid UUID id){
        log.info("Get all statistics by user id");
        List<StatisticDto> statisticDto = userStatisticService.getAllStatisticByUserId(id);

        return new ApiResponse<>(true, HttpStatus.OK, "Statistic get by user id successfully", statisticDto);
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
        userStatisticService.updateStatistic(statisticDto);
        return ApiResponse.apiResponse(true, 200, "Statistic update successfully", statisticDto.id());
    }

    @PatchMapping("/{id}")
    public ApiResponse<GenericResponse> updateStatisticByLiked(@PathVariable @Valid UUID id, @RequestBody(required = false) @Valid Boolean liked){
        log.info("Update statistic by liked");
        userStatisticService.updateStatisticPartially(id, liked);
        return ApiResponse.apiResponse(true, 200, "Statistic update successfully", id);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<GenericResponse> deleteStatistic(@PathVariable @Valid UUID id){
        log.info("Delete statistic");
        userStatisticService.deleteStatistic(id);
        return ApiResponse.apiResponse(true, 200, "Statistic successfully delete", null);
    }

}
