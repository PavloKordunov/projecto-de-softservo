package com.proj.forum.h2.repository;

import com.proj.forum.h2.model.CalendarAPI;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CalendarRepository extends JpaRepository<CalendarAPI, UUID> {
}
