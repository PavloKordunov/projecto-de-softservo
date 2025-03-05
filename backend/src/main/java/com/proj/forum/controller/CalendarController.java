//package com.proj.forum.controller;
//
//import com.proj.forum.annotation.Logging;
//import com.proj.forum.dto.ApiResponse;
//import com.proj.forum.dto.GroupDto;
//import com.proj.forum.dto.TopicDto;
//import com.proj.forum.service.CalendarService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatusCode;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.List;
//
//@Logging
//@RestController
//@RequestMapping("/api/calendar")
//@RequiredArgsConstructor
//@CrossOrigin("http://localhost:3000")
//public class CalendarController {
//
//    private final RestTemplate restTemplate;
//    private final CalendarService calendarService;
//
//    @Value("${omdb.api.url}")
//    String url;
//
//    @Value("${omdb.api.key}")
//    String key;
//
//    @GetMapping
//    public ApiResponse<List<TopicDto>> getCalendar() {
//
//    }
//
//}
