package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.annotation.RequireRoles;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.StatisticDto;
import com.proj.forum.enums.RoleType;
import com.proj.forum.service.UserStatisticService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Logging
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-statistic")
@CrossOrigin("https://localhost:3000")
public class UserStatisticController {

    private final UserStatisticService userStatisticService;

    @RequireRoles(RoleType.USER)
    @PostMapping("/like")
    public ApiResponse<StatisticDto> likePost(@RequestBody @Valid StatisticDto statisticDto) {
        StatisticDto newStatisticDto = userStatisticService.likePost(statisticDto);
        return new ApiResponse<>(true, HttpStatus.CREATED, "Statistic create successfully", newStatisticDto);
    }

    @RequireRoles(RoleType.USER)
    @PostMapping("/save")
    public ApiResponse<StatisticDto> savePost(@RequestBody @Valid StatisticDto statisticDto) {
        StatisticDto newStatisticDto = userStatisticService.savePost(statisticDto);
        return new ApiResponse<>(true, HttpStatus.CREATED, "Statistic create successfully", newStatisticDto);
    }

    @RequireRoles(RoleType.USER)
    @PostMapping("/rate")
    public ApiResponse<StatisticDto> rateTopic(@RequestBody @Valid StatisticDto statisticDto) {
        StatisticDto newStatisticDto = userStatisticService.rateTopic(statisticDto);
        return new ApiResponse<>(true, HttpStatus.CREATED, "Statistic create successfully", newStatisticDto);
    }



//    @GetMapping
//    public ApiResponse<List<StatisticDto>> getAllStatistic() {
//        List<StatisticDto> statisticDto = userStatisticService.getAllStatistic();
//        return new ApiResponse<>(true, HttpStatus.OK, "Statistic get successfully", statisticDto);
//    }
//
//    @GetMapping("/user/{id}")
//    public ApiResponse<List<StatisticDto>> getAllStatisticByUserId(@PathVariable @Valid UUID id) {
//        List<StatisticDto> statisticDto = userStatisticService.getAllStatisticByUserId(id);
//        return new ApiResponse<>(true, HttpStatus.OK, "Statistic get by user id successfully", statisticDto);
//    }
//
//    @RequireRoles(RoleType.USER)
//    @PutMapping
//    public ApiResponse<GenericResponse> updateStatistic(@RequestBody @Valid StatisticDto statisticDto) {
//        userStatisticService.updateStatistic(statisticDto);
//        return ApiResponse.apiResponse(true, 200, "Statistic update successfully", statisticDto.id());
//    }
//
//    @PatchMapping("/{id}")
//    public ApiResponse<GenericResponse> updateStatisticByLiked(@PathVariable @Valid UUID id, @RequestBody(required = false) @Valid Boolean liked) {
//        userStatisticService.updateStatisticPartially(id, liked);
//        return ApiResponse.apiResponse(true, 200, "Statistic update successfully", id);
//    }
//
//    @DeleteMapping("/{id}")
//    public ApiResponse<GenericResponse> deleteStatistic(@PathVariable @Valid UUID id) {
//        userStatisticService.deleteStatistic(id);
//        return ApiResponse.apiResponse(true, 200, "Statistic successfully delete", null);
//    }

}
