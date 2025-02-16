package com.proj.forum.repository;

import com.proj.forum.entity.ChatMessage;
import com.proj.forum.enums.MessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {
    List<ChatMessage> findByChatRoomIdOrderByTimestampAsc(UUID chatRoomId);
}
