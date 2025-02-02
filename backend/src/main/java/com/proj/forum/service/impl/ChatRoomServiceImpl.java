package com.proj.forum.service.impl;

import com.proj.forum.entity.ChatRoom;
import com.proj.forum.entity.User;
import com.proj.forum.repository.ChatRoomRepository;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public Optional<UUID> getChatId(
            UUID senderId, UUID recipientId, boolean createIfNotExist) {


        return chatRoomRepository
                .findByUser1AndUser2(senderId, recipientId)
                .map(ChatRoom::getId)
                .or(() -> {
                    if(!createIfNotExist) {
                        return  Optional.empty();
                    }
                    ChatRoom senderRecipient = ChatRoom
                            .builder()
                            .user1(senderId)
                            .user2(recipientId)
                            .build();

                    ChatRoom recipientSender = ChatRoom
                            .builder()
                            .user1(recipientId)
                            .user2(senderId)
                            .build();
                    chatRoomRepository.save(senderRecipient);
                    chatRoomRepository.save(recipientSender);

                    return Optional.of(UUID.randomUUID()); //TODO fix asap
                });
    }
}
