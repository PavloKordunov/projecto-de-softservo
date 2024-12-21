package com.proj.forum.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    @NotEmpty
    private Boolean readStatus;
}
