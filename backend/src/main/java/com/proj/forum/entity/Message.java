package com.proj.forum.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Message {
    @Id
    @GeneratedValue
    private UUID id;

    @NotEmpty
    private UUID senderId;
    @NotEmpty
    private UUID recipientId;
    @NotEmpty
    private String content;
    @NotEmpty
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;
}
