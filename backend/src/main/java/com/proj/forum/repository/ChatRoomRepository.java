package com.proj.forum.repository;

import com.proj.forum.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, UUID> {
    Optional<ChatRoom> findByUser1AndUser2(UUID user1, UUID user2);
}
