package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.ChatNotification;
import com.proj.forum.dto.MessageDto;
import com.proj.forum.dto.MessageRequestDto;
import com.proj.forum.entity.ChatMessage;
import com.proj.forum.service.ChatMessageService;
import com.proj.forum.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.security.Principal;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Logging
public class ChatMessageController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatRoomService chatRoomService;
    private final ChatMessageService messageService;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload MessageRequestDto messageRequest,
                            Principal principal) {
        MessageDto message = messageService.saveMessage(messageRequest, principal.getName());
        messagingTemplate.convertAndSend(
                "/topic/chatroom/" + message.getChatRoomId(),
                message
        );
    }

    @MessageMapping("/chat.joinRoom")
    public void joinRoom(@Payload UUID chatRoomId, Principal principal) {
        chatRoomService.addUserToChatRoom(chatRoomId, principal.getName());
        messagingTemplate.convertAndSend(
                "/topic/chatroom/" + chatRoomId + "/users",
                chatRoomService.getChatRoomUsers(chatRoomId)
        );
    }
}