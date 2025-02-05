package com.proj.forum.controller;

import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.ChatNotification;
import com.proj.forum.entity.ChatMessage;
import com.proj.forum.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatMessageController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageService chatMessageService;
    //private final ChatRoomService chatRoomService;

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {

        chatMessageService.createMessage(chatMessage);

        messagingTemplate.convertAndSendToUser(
                chatMessage.getRecipientUsername(),"/queue/messages",
                new ChatNotification(
                        chatMessage.getId(),
                        chatMessage.getSenderId(),
                        chatMessage.getSenderUsername()));
    }

    @GetMapping("/messages/{senderId}/{recipientId}/count")
    public ApiResponse<?> countNewMessages(
            @PathVariable UUID senderId,
            @PathVariable UUID recipientId) {

        return new ApiResponse<>(true, HttpStatus.OK, " " , chatMessageService.countNewMessages(senderId, recipientId));
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ApiResponse<?> findChatMessages ( @PathVariable UUID senderId,
                                             @PathVariable UUID recipientId) {

        return new ApiResponse<>(true, HttpStatus.OK, " " , chatMessageService.findChatMessages(senderId, recipientId));
    }

    @GetMapping("/messages/{id}")
    public ApiResponse<?> findMessage (@PathVariable UUID id) {
        return new ApiResponse<>(true, HttpStatus.OK, "Message found by id", chatMessageService.findMessageById(id));
    }
}