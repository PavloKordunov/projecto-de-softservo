package com.proj.forum.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name ="chat_rooms")
public class ChatRoom {
    @Id
    @GeneratedValue
    private UUID id;

    @NotEmpty
    private String roomId;  //name?

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
    private List<Message> messages;

}
