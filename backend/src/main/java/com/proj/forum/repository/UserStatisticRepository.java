package com.proj.forum.repository;

import com.proj.forum.entity.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserStatisticRepository extends JpaRepository<Statistic, UUID> {
}
