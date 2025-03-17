package com.proj.forum.service.impl;


import com.proj.forum.h2.model.Calendar;
import com.proj.forum.h2.repository.CalendarRepository;
import com.proj.forum.service.CalendarService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Transactional("h2TransactionManager")
@AllArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    final private CalendarRepository calendarRepository;

    @Override
    public void saveCalendar(ResponseEntity<Map> response) {
        Calendar calendar = Calendar.builder()
                .content(response.getBody().get("Title").toString())
                .build();
        var calendarEntity = calendarRepository.save(calendar);
    }
}
