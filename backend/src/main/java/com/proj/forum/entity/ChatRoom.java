package com.proj.forum.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Builder
@Table(name = "chatrooms")
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private UUID user1; //main user

    @Column(nullable = false)
    private UUID user2;

    private LocalDateTime createdAt;

    @OneToMany
    private List<ChatMessage> chatMessages;
}
