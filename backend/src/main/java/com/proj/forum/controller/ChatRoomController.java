package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.ChatRoomDto;
import com.proj.forum.dto.MessageDto;
import com.proj.forum.service.ChatMessageService;
import com.proj.forum.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/chatrooms")
@RequiredArgsConstructor
@Logging
@CrossOrigin("http://localhost:3000")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatMessageService messageService;

    @PostMapping("/create")
    public ApiResponse<UUID> createRoom(@RequestBody ChatRoomDto chatRoomDto) {
        return new ApiResponse<>(true, HttpStatus.OK, "create chat", chatRoomService.createChatRoom(chatRoomDto).id());
    }

    @GetMapping("/{chatRoomId}/history")
    public ApiResponse<List<MessageDto>> getChatHistory(@PathVariable UUID chatRoomId) {
        return new ApiResponse<>(true, HttpStatus.OK, "history chat", messageService.getChatRoomHistory(chatRoomId));
    }
}
