package com.proj.forum.repository;

import com.proj.forum.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    List<Notification> findAllByUserIdAndReadIsFalse(UUID userId);
    Page<Notification> findAllByUserIdAndReadIsFalse(UUID userId, Pageable pageable);
}
