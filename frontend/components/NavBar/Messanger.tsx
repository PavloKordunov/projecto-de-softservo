import { useState, useEffect, useRef, use } from "react";
import Image from "next/image";
import Chat from "./Chat";
import { WebSocketService } from "@/services/websocket";
import { User, Message, ChatPreview } from "@/types/chatTypes";
import { useTheme } from "next-themes";

interface MessangerProps {
  handleShow: () => void;
  currentUser: User;
}

const Messanger = ({ handleShow, currentUser }: MessangerProps) => {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const wsService = useRef<WebSocketService | null>(null);
  const { theme } = useTheme();

  const chats: ChatPreview[] = [
    {
      id: "1",
      name: "Вініпух228",
      lastMessage: ":(",
      time: "15:26",
      avatar: "/person.png",
      unread: 0,
    },
  ];

  useEffect(() => {
    wsService.current = new WebSocketService();
    wsService.current.connect().catch(console.error);

    return () => {
      wsService.current?.disconnect();
    };
  }, []);

  const handleShowChat = (chatId: string) => {
    if (wsService.current) {
      if (activeChat) {
        wsService.current.unsubscribeFromChat(activeChat);
      }

      setActiveChat(chatId);
      setIsOpenChat(true);
      setMessages([]);
      
      wsService.current.joinChatRoom(chatId, currentUser);
      
      wsService.current.subscribeToChatRoom(chatId, (message: Message) => {
        setMessages(prev => [...prev, {
          ...message,
          timestamp: typeof message.timestamp === 'string' 
            ? new Date(message.timestamp) 
            : message.timestamp
        }]);
      });

      wsService.current.subscribeToUserUpdates(chatId, (users: User[]) => {
        setOnlineUsers(users);
      });
    }
  };

  const handleBackToList = () => {
    if (activeChat && wsService.current) {
      wsService.current.unsubscribeFromChat(activeChat);
    }
    setIsOpenChat(false);
    setActiveChat(null);
    setMessages([]);
  };

  const handleSendMessage = (content: string) => {
    if (activeChat && wsService.current) {
      wsService.current.sendMessage(activeChat, { content }, currentUser);
    }
  };

  return (
    <div className={`fixed w-[370px] z-50 ${theme === 'dark' ? 'bg-gray-800 border-gray-700'  : 'bg-[#EAEAEA] border-[#E4E3E3]'}  p-4 top-[100px] right-[30px] flex flex-col rounded-xl shadow-xl border `}>
      {!isOpenChat ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'} font-bold`}>Повідомлення</h2>
            <button onClick={handleShow} className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-black hover:text-AccnetColor'} `}>
              <svg className="w-6 h-6" fill="currentColor">
                <use href="/sprite.svg#closeBtnIcon" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {chats.map(chat => (
              <div 
                key={chat.id}
                onClick={() => handleShowChat(chat.id)}
                className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-[#B5B5B5]'} p-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-gray-600 transition-colors`}
              >
                <div className="relative">
                  <Image 
                    src={chat.avatar} 
                    alt={chat.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  {chat.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold text-white truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-400">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-300 truncate">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Chat 
          handleBackToList={handleBackToList}
          handleShow={handleShow}
          handleSendMessage={handleSendMessage}
          messages={messages}
          onlineUsers={onlineUsers}
          currentUser={currentUser}
          chatInfo={chats.find(chat => chat.id === activeChat)}
        />
      )}
    </div>
  );
};

export default Messanger;