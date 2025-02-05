package com.proj.forum.service;

import java.util.Optional;
import java.util.UUID;

public interface ChatRoomService {
    Optional<UUID> getChatId(UUID senderId, UUID recipientId, boolean ifExists);
}
