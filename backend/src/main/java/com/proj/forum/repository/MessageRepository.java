package com.proj.forum.repository;

import com.proj.forum.entity.Message;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MessageRepository extends JpaRepository<Message, UUID> {
    List<Message> findAll();

    Optional<Message> findById(UUID id);


    default Message findOneById(UUID id) {
        return findById(id).orElseThrow(() -> new EntityNotFoundException("Message doesn't find"));
    }
}
