package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Logging
@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping
    public ApiResponse<Map> getCalendar() {
        ResponseEntity<Map> response = calendarService.saveCalendar("Inception");

        return new ApiResponse<>(true, response.getStatusCode(), "Get movie from API", response.getBody());
    }
//    @GetMapping
//    public ApiResponse<List<TopicDto>> getCalendar() {
//
//        return null;
//    }

}
