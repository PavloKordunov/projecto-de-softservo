package com.proj.forum.service.impl;


import com.proj.forum.config.OMDbConfig;
import com.proj.forum.h2.model.Calendar;
import com.proj.forum.h2.repository.CalendarRepository;
import com.proj.forum.service.CalendarService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@Transactional("h2TransactionManager")
@AllArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    private final OMDbConfig omdbConfig;
    private final RestTemplate restTemplate;
    private final CalendarRepository calendarRepository;

    @Override
    public ResponseEntity<Map> saveCalendar(String nameMovie) {
        String apiUrl = String.format("%s/?apikey=%s&t=%s", omdbConfig.getUrl(), omdbConfig.getKey(), nameMovie);

        ResponseEntity<Map> response = restTemplate.getForEntity(apiUrl, Map.class);
        Calendar calendar = Calendar.builder()
                .content(response.getBody().get("Title").toString())
                .build();
        //var calendarEntity = calendarRepository.save(calendar);
        return response;
    }
}
