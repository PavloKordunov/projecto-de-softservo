package com.proj.forum.repository;

import com.proj.forum.entity.ChatMessage;
import com.proj.forum.enums.MessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {
    //List<ChatMessage> findAll();
    //Optional<ChatMessage> findById(UUID id);
    //Long countBySenderIdAndRecipientIdAndMessageStatus(UUID senderId, UUID recipientId, MessageStatus status);
    Long countBySenderIdAndRecipientIdAndMessageStatus(UUID senderId, UUID recipientId, MessageStatus messageStatus);
    List <ChatMessage> findAllByChatRoom_Id(UUID Id);

    @Query("update ChatMessage c set c.messageStatus = :messageStatus where c.chatRoom.id = :chatRoomId")
    @Modifying
    void updateMessageStatusByChatRoom_Id(MessageStatus messageStatus, UUID chatRoomId);

    //void updateMessageStatusBySenderIdAndRecipientId(UUID senderId, UUID recipientId, MessageStatus messageStatus);
    //void updateMessageStatusBySenderIdAndRecipientId(UUID senderId, UUID recipientId, MessageStatus messageStatus);

}
