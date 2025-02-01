//package com.proj.forum.controller;
//
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class ChatController {
//
//    private final SimpMessagingTemplate messagingTemplate;
//
//    public ChatController(SimpMessagingTemplate messagingTemplate) {
//        this.messagingTemplate = messagingTemplate;
//    }
//
//    /**
//     * Handle messages sent to a specific chatroom.
//     * @param chatroomId The ID of the chatroom
//     * @param message The message sent by a user
//     */
//    @MessageMapping("/chatroom/{chatroomId}")
//    public void sendMessageToChatroom(@org.springframework.messaging.handler.annotation.DestinationVariable String chatroomId,
//                                      String message) {
//        // Send message to all subscribers of the chatroom topic
//        messagingTemplate.convertAndSend("/chatroom/" + chatroomId, message);
//    }
//}
