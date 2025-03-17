package com.proj.forum.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface CalendarService {

    void saveCalendar(ResponseEntity<Map> response);
}
