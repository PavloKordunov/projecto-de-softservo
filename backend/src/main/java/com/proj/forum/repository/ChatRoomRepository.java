package com.proj.forum.repository;

import com.proj.forum.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

//@Transactional(transactionManager = "postgresTransactionManager")
public interface ChatRoomRepository extends JpaRepository<ChatRoom, UUID> {
    Optional<ChatRoom> findByName(String name);
    Optional<ChatRoom> findById(UUID id);

}
