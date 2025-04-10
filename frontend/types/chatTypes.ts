export interface Message {
  id?: string;
  content: string;
  senderId: string;
  senderName: string;
  chatRoomId: string;
  timestamp: Date | string;
}

export interface ChatRoom {
  id: string;
  name: string;
  userIds: Set<string>;
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatar?: string;
}

export interface ChatPreview {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread: number;
}