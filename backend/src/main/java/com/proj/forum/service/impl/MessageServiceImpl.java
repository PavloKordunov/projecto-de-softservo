package com.proj.forum.service.impl;

import com.proj.forum.dto.MessageDto;
import com.proj.forum.entity.Message;
import com.proj.forum.repository.MessageRepository;
import com.proj.forum.service.MessageService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    @Override
    public UUID createMessage(MessageDto messageDto) {
        Message message = mapToMessage(messageDto);
        messageRepository.save(message);
        return message.getId();
    }
    private static Message mapToMessage(MessageDto messageDto) {
        return Message.builder()
                .id(messageDto.id())
                .senderId(messageDto.senderID())
                .recipientId(messageDto.recipientId())
                .content(messageDto.content())
                .timestamp(messageDto.timestamp())
                .readStatus(messageDto.readStatus())
                .build();
    }

    @Override
    public List<MessageDto> findAllMessages() {
        List<Message> messageDtos = messageRepository.findAll();
        if(messageDtos.isEmpty()) throw new EntityNotFoundException("Messages don't find");
        return messageDtos.stream()
                .map(MessageServiceImpl::getMessageDto)
                .toList();
    }

    private static MessageDto getMessageDto(Message message) {
        return MessageDto.builder()
                .id(message.getId())
                .senderID(message.getSenderId())
                .recipientId(message.getRecipientId())
                .content(message.getContent())
                .timestamp(message.getTimestamp())
                .readStatus(message.getReadStatus())
                .build();
    }

    @Override
    public MessageDto findMessage(UUID id) {
        Message message = messageRepository.findOneById(id);
        return getMessageDto(message);
    }
}
