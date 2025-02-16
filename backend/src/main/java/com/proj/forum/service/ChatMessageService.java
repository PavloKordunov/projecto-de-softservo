package com.proj.forum.service;

import com.proj.forum.dto.MessageDto;
import com.proj.forum.dto.MessageRequestDto;

import java.util.List;
import java.util.UUID;

public interface ChatMessageService {
//    ChatMessage createMessage(ChatMessage messageDto);
//    ChatMessage findMessageById(UUID id);
//    List<ChatMessage> findChatMessages(UUID senderId, UUID recipientId);
//    void updateStatuses(UUID senderId, UUID recipientId, MessageStatus status);
    MessageDto saveMessage(MessageRequestDto messageRequest, String username);
    List<MessageDto> getChatRoomHistory(UUID chatRoomId);

}
