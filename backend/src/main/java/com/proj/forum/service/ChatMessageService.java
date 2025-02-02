package com.proj.forum.service;

import com.proj.forum.entity.ChatMessage;
import com.proj.forum.enums.MessageStatus;

import java.util.List;
import java.util.UUID;

public interface ChatMessageService {
    ChatMessage createMessage(ChatMessage messageDto);
    //List<ChatMessage> findAllMessages();
    //ChatMessage findMessage(UUID id);
    ChatMessage findMessageById(UUID id);
   // ChatMessage updateMessage(UUID id, String content);
    //void deleteMessage(UUID id);
    Long countNewMessages(UUID senderId, UUID recipientId);
    List<ChatMessage> findChatMessages(UUID senderId, UUID recipientId);
    void updateStatuses(UUID senderId, UUID recipientId, MessageStatus status);
}
