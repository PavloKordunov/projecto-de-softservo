package com.proj.forum.repository;

import com.proj.forum.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MessangeRepository extends JpaRepository<Message, UUID> {

}
