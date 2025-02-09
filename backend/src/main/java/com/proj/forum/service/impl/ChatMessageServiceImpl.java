package com.proj.forum.service.impl;

import com.proj.forum.annotation.Logging;
import com.proj.forum.entity.ChatMessage;
import com.proj.forum.enums.MessageStatus;
import com.proj.forum.exception.TokenTypeException;
import com.proj.forum.repository.ChatMessageRepository;
import com.proj.forum.service.ChatMessageService;
import com.proj.forum.service.ChatRoomService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;



@Service
@Transactional
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;

    @Transactional
    @Override
    public ChatMessage createMessage(ChatMessage chatMessage) {
        try {
            var message = chatMessageRepository.save(chatMessage);
            message.setMessageStatus(MessageStatus.DELIVERED);
            return message;
        }catch (Exception e) {
            chatMessage.setMessageStatus(MessageStatus.FAILED);
            return chatMessage;
        }

    }

    @Override
    public Long countNewMessages(UUID senderId, UUID recipientId) {
        return chatMessageRepository.countBySenderIdAndRecipientIdAndMessageStatus(senderId, recipientId, MessageStatus.RECEIVED);
    }

    @Transactional
    @Override
    public List<ChatMessage> findChatMessages(UUID senderId, UUID recipientId) {
        Optional<UUID> chatId = chatRoomService.getChatId(senderId, recipientId, false);

        List<ChatMessage> messages = chatId
                .map(chatMessageRepository::findAllByChatRoom_Id)
                .orElse(List.of());

        if (!messages.isEmpty()) {
            updateStatuses(senderId, recipientId, MessageStatus.DELIVERED);
        }

        return messages;
    }

    @Transactional
    @Override
    public ChatMessage findMessageById(UUID id) {
        return chatMessageRepository.findById(id)
                .map(chatMessage -> {
                    chatMessage.setMessageStatus(MessageStatus.DELIVERED);
                    return chatMessageRepository.save(chatMessage);
                })
                .orElseThrow(() -> new TokenTypeException("Can't find message (" + id + ")"));
    }

    @Transactional
    @Override
    public void updateStatuses(UUID senderId, UUID recipientId, MessageStatus status) {
        UUID uuid = chatRoomService.getChatId(senderId, recipientId, true)
            .orElseThrow(()->new TokenTypeException("Can't find chat room"));

        chatMessageRepository.updateMessageStatusByChatRoom_Id(status, uuid);
    }
}
