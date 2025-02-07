package com.proj.forum.service.impl;

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

//package com.proj.forum.service.impl;
//
//import com.proj.forum.dto.MessageDto;
//import com.proj.forum.entity.ChatMessage;
//import com.proj.forum.repository.ChatMessageRepository;
//import com.proj.forum.service.ChatMessageService;
//import jakarta.persistence.EntityNotFoundException;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//import java.util.UUID;
//
//@Slf4j
//@Service
//@Transactional
//@RequiredArgsConstructor
//public class ChatMessageServiceImpl implements ChatMessageService {
//
//    private final ChatMessageRepository chatMessageRepository;
//
//    @Override
//    public UUID createMessage(MessageDto messageDto) {
//        ChatMessage chatMessage = mapToMessage(messageDto);
//        chatMessageRepository.save(chatMessage);
//        return chatMessage.getId();
//    }
//    private static ChatMessage mapToMessage(MessageDto messageDto) {
//        return ChatMessage.builder()
//                .id(messageDto.id())
//                .senderId(messageDto.senderID())
//                .recipientId(messageDto.recipientId())
//                .content(messageDto.content())
//                .timestamp(messageDto.timestamp())
//                .readStatus(messageDto.readStatus())
//                .build();
//    }
//
//    @Override
//    public List<MessageDto> findAllMessages() {
//        List<ChatMessage> chatMessageDtos = chatMessageRepository.findAll();
//        if(chatMessageDtos.isEmpty()) throw new EntityNotFoundException("Messages don't find");
//        return chatMessageDtos.stream()
//                .map(ChatMessageServiceImpl::getUpdateMessageDto)
//                .toList();
//    }
//
//    @Override
//    public MessageDto findMessage(UUID id) {
//        ChatMessage chatMessage = chatMessageRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Message doesn't find"));
//        return getUpdateMessageDto(chatMessage);
//    }
//
//    @Transactional
//    @Override
//    public MessageDto updateMessage(UUID id, String content) {
//        ChatMessage updatedChatMessage = chatMessageRepository.findById(id)
//                .map(mess -> updateMessage(mess, content))
//                .orElseThrow(() -> new EntityNotFoundException("Message doesn't find"));
//        chatMessageRepository.save(updatedChatMessage);
//        return getUpdateMessageDto(updatedChatMessage);
//    }
//
//    private static MessageDto getUpdateMessageDto(ChatMessage chatMessage) {
//        return MessageDto.builder()
//                .id(chatMessage.getId())
//                .senderID(chatMessage.getSenderId())
//                .recipientId(chatMessage.getRecipientId())
//                .content(chatMessage.getContent())
//                .timestamp(chatMessage.getTimestamp())
//                .readStatus(chatMessage.getReadStatus())
//                .build();
//    }
//
//    static private ChatMessage updateMessage(ChatMessage chatMessage, String content){
//        if(!chatMessage.getContent().equals(content))
//            chatMessage.setContent(content);
//        return chatMessage;
//    }
//
//    @Override
//    public void deleteMessage(UUID id) {
//        if (chatMessageRepository.existsById(id))
//            chatMessageRepository.deleteById(id);
//        else
//            throw new EntityNotFoundException("Message doesn't find");
//    }
//}

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;

    @Transactional
    @Override
    public ChatMessage createMessage(ChatMessage chatMessage) {
        chatMessage.setMessageStatus(MessageStatus.RECEIVED);
        log.info("Create message");
        return chatMessageRepository.save(chatMessage);
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
