package com.proj.forum.repository;

import com.proj.forum.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

//@Transactional(transactionManager = "postgresTransactionManager")
@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, UUID> {
}
