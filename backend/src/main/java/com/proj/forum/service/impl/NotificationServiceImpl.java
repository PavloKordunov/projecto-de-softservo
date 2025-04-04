package com.proj.forum.service.impl;

import com.proj.forum.entity.Group;
import com.proj.forum.entity.Notification;
import com.proj.forum.repository.NotificationRepository;
import com.proj.forum.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public List<Notification> getUnreadNotifications(UUID userId) {
        return notificationRepository.findAllByUserIdAndReadIsFalse(userId);
    }

    @Override
    public void markAsRead(UUID id) {
        Notification notification = notificationRepository.findById(id).orElseThrow();
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    public void markAllAsRead(UUID userId) {
        List<Notification> unread = notificationRepository.findAllByUserIdAndReadIsFalse(userId);
        for (Notification notification : unread) {
            notification.setRead(true);
        }
        notificationRepository.saveAll(unread);
    }

    @Override
    public void createNotification(UUID userId, Group group, String message) {
        Notification notification = Notification.builder()
                .userId(userId)
                .groupId(group.getId())
                .message(message)
                .build();
        notificationRepository.save(notification);
    }
}
