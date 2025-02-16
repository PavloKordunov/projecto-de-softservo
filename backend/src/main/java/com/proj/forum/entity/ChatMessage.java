package com.proj.forum.entity;

import com.proj.forum.enums.MessageStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Builder
@Table(name = "messages")
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue
    private UUID id;

    private String content;

    @ManyToOne
    private User sender;

    @ManyToOne
    private ChatRoom chatRoom;

    private LocalDateTime timestamp;

}
