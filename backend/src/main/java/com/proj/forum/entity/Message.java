package com.proj.forum.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Message {
    @Id
    @GeneratedValue
    private UUID id;

    private UUID senderId;
    //private UUID recipientId;
    private String content;
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;
}
