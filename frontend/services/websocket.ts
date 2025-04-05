import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Message, User } from '@/types/chatTypes';

export class WebSocketService {
  private client: Client | null = null;
  private subscriptions: Map<string, any> = new Map();

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client = new Client({
        webSocketFactory: () => new SockJS('https://localhost:8080/ws'),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: (str) => console.debug(str),
      });

      this.client.onConnect = () => resolve();
      this.client.onStompError = (frame) => reject(new Error(frame.headers.message));
      this.client.onWebSocketError = (error) => reject(error);

      this.client.activate();
    });
  }

  disconnect() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions.clear();
    this.client?.deactivate();
    this.client = null;
  }

  joinChatRoom(chatRoomId: string, user: User) {
      if (!this.client?.connected) throw new Error('Not connected');
      if (!user?.id) throw new Error('User not authenticated'); // Add validation
      
      this.client.publish({
        destination: '/app/chat.joinRoom',
        body: JSON.stringify(chatRoomId),
        headers: { 'user-id': user.id },
      });
    }

  sendMessage(chatRoomId: string, message: { content: string }, user: User) {
    if (!this.client?.connected) throw new Error('Not connected');
    
    this.client.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify({
        content: message.content,
        chatRoomId,
      }),
      headers: { 'user-id': user.id },
    });
  }

  subscribeToChatRoom(
    chatRoomId: string, 
    callback: (message: Message) => void
  ): string {
    if (!this.client?.connected) throw new Error('Not connected');
    
    const sub = this.client.subscribe(
      `/chatroom/${chatRoomId}`,
      (message: IMessage) => callback(JSON.parse(message.body))
    );
    
    const subId = `msg-${chatRoomId}-${Date.now()}`;
    this.subscriptions.set(subId, sub);
    return subId;
  }

  subscribeToUserUpdates(
    chatRoomId: string, 
    callback: (users: User[]) => void
  ): string {
    if (!this.client?.connected) throw new Error('Not connected');
    
    const sub = this.client.subscribe(
      `/chatroom/${chatRoomId}/users`,
      (message: IMessage) => callback(JSON.parse(message.body))
    );
    
    const subId = `users-${chatRoomId}-${Date.now()}`;
    this.subscriptions.set(subId, sub);
    return subId;
  }

  unsubscribeFromChat(chatRoomId: string) {
    this.subscriptions.forEach((sub, key) => {
      if (key.includes(chatRoomId)) {
        sub.unsubscribe();
        this.subscriptions.delete(key);
      }
    });
  }
}