package com.proj.forum.entity;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class ChatRoom {
    @Id
    @GeneratedValue//(strategy = GenerationType.IDENTITY)
    private UUID id;

    private String roomId;  //name?

    @OneToMany
    private List<User> users;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
    private List<Message> messages;


}
