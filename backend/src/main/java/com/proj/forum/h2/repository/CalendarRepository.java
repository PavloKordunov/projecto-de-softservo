package com.proj.forum.h2.repository;

import com.proj.forum.h2.model.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, UUID> {
    Calendar save(Calendar calendar);
}
