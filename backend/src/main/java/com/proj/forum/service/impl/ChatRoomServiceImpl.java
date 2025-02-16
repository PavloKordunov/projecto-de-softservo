package com.proj.forum.service.impl;

import com.proj.forum.annotation.Logging;
import com.proj.forum.dto.ChatRoomDto;
import com.proj.forum.entity.ChatRoom;
import com.proj.forum.entity.User;
import com.proj.forum.repository.ChatRoomRepository;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.ChatRoomService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Logging
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public ChatRoomDto createChatRoom(ChatRoomDto chatRoomDto) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setName(chatRoomDto.name());

        List<User> user = userRepository.findByIdIn(chatRoomDto.getUserIds());
        Set<User> users = new HashSet<>(user);
        chatRoom.setUsers(users);

        return convertToDto(chatRoomRepository.save(chatRoom));
    }

    public void addUserToChatRoom(UUID chatRoomId, String username) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found"));
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        chatRoom.getUsers().add(user);
        chatRoomRepository.save(chatRoom);
    }

    public Set<User> getChatRoomUsers(UUID chatRoomId) { //TODO maybe List<User>
        return chatRoomRepository.findById(chatRoomId)
                .map(ChatRoom::getUsers)
                .orElseThrow(() -> new EntityNotFoundException("Chat room not found"));
    }

    private ChatRoomDto convertToDto(ChatRoom chatRoom) {
        return ChatRoomDto.builder()
                .id(chatRoom.getId())
                .name(chatRoom.getName())
                .userIds(chatRoom.getUsers().stream()
                        .map(User::getId)
                        .collect(Collectors.toSet()))
                .build();
    }
}
