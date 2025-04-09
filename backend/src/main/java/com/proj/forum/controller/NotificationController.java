package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.entity.Notification;
import com.proj.forum.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Logging
@RequestMapping("/api/notifications")
@CrossOrigin("https://localhost:3000")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/unread/{userId}")
    public List<Notification> getUnreadNotifications(@PathVariable UUID userId,
                                                     @RequestParam Integer page,
                                                     @RequestParam Integer amount) {
        return notificationService.getUnreadNotifications(userId, page, amount);
    }

    @PatchMapping("/read/{notificationId}")
    public void markAsRead(@PathVariable UUID notificationId) {
        notificationService.markAsRead(notificationId);
    }

    @PatchMapping("/mark-all-read/{userId}")
    public ApiResponse<?> markAllRead(@PathVariable UUID userId) {
        notificationService.markAllAsRead(userId);
        return new ApiResponse<>(true, HttpStatus.OK, "Mark all read", null);
    }
}
