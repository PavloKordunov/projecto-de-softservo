package com.proj.forum.service;

import com.proj.forum.entity.Group;
import com.proj.forum.entity.Notification;

import java.util.List;
import java.util.UUID;

public interface NotificationService {
    List<Notification> getUnreadNotifications(UUID userId, Integer page, Integer amount);

    void markAsRead(UUID id);
    void markAllAsRead(UUID userId);
    void createNotification(UUID userId, Group group, String message);
}
