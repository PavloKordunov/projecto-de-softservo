package com.proj.forum.service.impl;

import com.proj.forum.annotation.Logging;
import com.proj.forum.dto.MessageDto;
import com.proj.forum.dto.MessageRequestDto;
import com.proj.forum.entity.ChatMessage;
import com.proj.forum.entity.ChatRoom;
import com.proj.forum.entity.User;
import com.proj.forum.repository.ChatMessageRepository;
import com.proj.forum.repository.ChatRoomRepository;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.ChatMessageService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


//public class ChatMessageServiceImpl implements ChatMessageService {
//
//    private final ChatMessageRepository chatMessageRepository;
//    private final ChatRoomService chatRoomService;
//
//    @Transactional
//    @Override
//    public ChatMessage createMessage(ChatMessage chatMessage) {
//        try {
//            var message = chatMessageRepository.save(chatMessage);
//            message.setMessageStatus(MessageStatus.DELIVERED);
//            return message;
//        }catch (Exception e) {
//            chatMessage.setMessageStatus(MessageStatus.FAILED);
//            return chatMessage;
//        }
//
//    }
//
//    @Transactional
//    @Override
//    public List<ChatMessage> findChatMessages(UUID senderId, UUID recipientId) {
//        Optional<UUID> chatId = chatRoomService.getChatId(senderId, recipientId, false);
//
//        List<ChatMessage> messages = chatId
//                .map(chatMessageRepository::findAllByChatRoom_Id)
//                .orElse(List.of());
//
//        if (!messages.isEmpty()) {
//            updateStatuses(senderId, recipientId, MessageStatus.DELIVERED);
//        }
//
//        return messages;
//    }
//
//    @Transactional
//    @Override
//    public ChatMessage findMessageById(UUID id) {
//        return chatMessageRepository.findById(id)
//                .map(chatMessage -> {
//                    chatMessage.setMessageStatus(MessageStatus.DELIVERED);
//                    return chatMessageRepository.save(chatMessage);
//                })
//                .orElseThrow(() -> new TokenTypeException("Can't find message (" + id + ")"));
//    }
//
//    @Transactional
//    @Override
//    public void updateStatuses(UUID senderId, UUID recipientId, MessageStatus status) {
//        UUID uuid = chatRoomService.getChatId(senderId, recipientId, true)
//            .orElseThrow(()->new TokenTypeException("Can't find chat room"));
//
//        chatMessageRepository.updateMessageStatusByChatRoom_Id(status, uuid);
//    }
//}
@Service
@Transactional("postgreTransactionManager")
@RequiredArgsConstructor
@Logging
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;

    public MessageDto saveMessage(MessageRequestDto messageRequest, String username) {
        User sender = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        ChatRoom chatRoom = chatRoomRepository.findById(messageRequest.getChatRoomId())
                .orElseThrow(() -> new RuntimeException("Chat room not found"));

        ChatMessage message = new ChatMessage();
        message.setContent(messageRequest.getContent());
        message.setSender(sender);
        message.setChatRoom(chatRoom);
        message.setTimestamp(LocalDateTime.now());

        ChatMessage savedMessage = messageRepository.save(message);
        return convertToDto(savedMessage);
    }

    public List<MessageDto> getChatRoomHistory(UUID chatRoomId) {
        return messageRepository.findByChatRoomIdOrderByTimestampAsc(chatRoomId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private MessageDto convertToDto(ChatMessage message) {
        return MessageDto.builder()
                .content(message.getContent())
                .senderId(message.getSender().getId())
                .senderName(message.getSender().getName())
                .chatRoomId(message.getChatRoom().getId())
                .timestamp(message.getTimestamp())
                .build();
    }
}
