package com.proj.forum.entity;

//import com.proj.forum.enums.MessageType;
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

    @NotEmpty
    private UUID senderId;
    @NotEmpty
    private UUID recipientId;
    @NotEmpty
    private String content;
    @NotEmpty
    private LocalDateTime timestamp;
    @NotEmpty
    private Boolean readStatus;

    private String senderUsername;

    private String recipientUsername;

    @ManyToOne
    private ChatRoom chatRoom;

    private MessageStatus messageStatus;
}
