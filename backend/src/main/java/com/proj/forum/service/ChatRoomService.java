package com.proj.forum.service;

import com.proj.forum.dto.ChatRoomDto;
import com.proj.forum.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface ChatRoomService {
    //Optional<UUID> getChatId(UUID senderId, UUID recipientId, boolean ifExists);
    ChatRoomDto createChatRoom(ChatRoomDto chatRoomDTO);
    void addUserToChatRoom(UUID chatRoomId, String username);
    Set<User> getChatRoomUsers(UUID chatRoomId);
}
