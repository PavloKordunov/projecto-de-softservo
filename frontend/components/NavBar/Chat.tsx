import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Message, User } from "@/types/chatTypes";
import { useTheme } from "next-themes";

interface ChatProps {
  handleBackToList: () => void;
  handleShow: () => void;
  handleSendMessage: (content: string) => void;
  messages: Message[];
  onlineUsers: User[];
  currentUser: User;
  chatInfo?: {
    name: string;
    avatar: string;
    lastSeen?: string;
  };
}

const Chat = ({
  handleBackToList,
  handleShow,
  handleSendMessage,
  messages,
  onlineUsers,
  currentUser,
  chatInfo,
}: ChatProps) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      handleSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button 
            onClick={handleBackToList}
            className="mr-3 text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6 rotate-180" fill="currentColor">
              <use href="/sprite.svg#exit-arrow" />
            </svg>
          </button>
          <div className="flex items-center">
            <Image 
              src={chatInfo?.avatar || "/person.png"} 
              alt={chatInfo?.name || "Chat"} 
              width={40} 
              height={40} 
              className="rounded-full mr-3"
            />
            <div>
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{chatInfo?.name}</h3>
              <p className="text-xs text-gray-400">
                {onlineUsers.length > 1 ? "Online" : `Active ${chatInfo?.lastSeen || "recently"}`}
              </p>
            </div>
          </div>
        </div>
        <button onClick={handleShow} className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="currentColor">
            <use href="/sprite.svg#closeBtnIcon" />
          </svg>
        </button>
      </div>

      <div className={`flex-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-[#B5B5B5]'} rounded-[10px] p-4 mb-4 overflow-y-auto max-h-[400px]`}>
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div 
              key={index}
              className={`flex ${msg.senderId === currentUser.id ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${msg.senderId === currentUser.id 
                  ? "bg-blue-600 rounded-br-none" 
                  : "bg-gray-600 rounded-bl-none"}`}
              >
                <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{msg.content}</p>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} text-right`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button type="button" className={`${theme === 'dark' ? 'text-gray-400' : 'text-black '} hover:text-white p-2`}>
          <svg className="w-5 h-5" fill="currentColor">
            <use href="/sprite.svg#paperClipIcon" />
          </svg>
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`flex-1 ${theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-[#B5B5B5] text-black placeholder-gray-800'}  rounded-[10px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Повідомлення.."
        />
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors"
          disabled={!message.trim()}
        >
          <svg className="w-5 h-5" fill="currentColor">
            <use href="/sprite.svg#sendIcon" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;