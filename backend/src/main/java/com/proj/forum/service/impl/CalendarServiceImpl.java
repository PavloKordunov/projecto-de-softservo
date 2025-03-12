package com.proj.forum.service.impl;


import com.proj.forum.service.CalendarService;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;

@Service
@Transactional("postgreTransactionManager")
public class CalendarServiceImpl implements CalendarService {
}
