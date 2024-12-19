package com.proj.forum.service;

import com.proj.forum.dto.MessageDto;

import java.util.List;
import java.util.UUID;

public interface MessageService {
    UUID createMessage(MessageDto messageDto);
    List<MessageDto> findAllMessages();
    MessageDto findMessage(UUID id);
}
