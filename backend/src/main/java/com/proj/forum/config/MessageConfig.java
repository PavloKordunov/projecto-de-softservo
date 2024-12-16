
//public class WebSocketAuthInterceptor implements ChannelInterceptor {
//
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        MessageHeaderAccessor accessor = MessageHeaderAccessor.wrap(message);
//        String token = accessor.getFirstNativeHeader("Authorization");
//        // Validate token with Okta and extract user information
//        return message;
//    }
//}