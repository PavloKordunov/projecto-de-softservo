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
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@Logging
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatMessageService messageService;

    @PostMapping("/rooms")
    public ApiResponse<ChatRoomDto> createRoom(@RequestBody ChatRoomDto chatRoomDto) {
        return new ApiResponse<>(true, HttpStatus.OK, "", chatRoomService.createChatRoom(chatRoomDto));
    }

    @GetMapping("/{chatRoomId}/history")
    public ApiResponse<List<MessageDto>> getChatHistory(@PathVariable UUID chatRoomId) {
        return new ApiResponse<>(true, HttpStatus.OK, "", messageService.getChatRoomHistory(chatRoomId));
    }
}
