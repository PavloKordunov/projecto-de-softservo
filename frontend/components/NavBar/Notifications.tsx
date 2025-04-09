import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useUser } from "@/hooks/useUser";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { parseDate } from "@/lib/dataParser";

interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

const Notifications = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { theme } = useTheme();
  const { user } = useUser();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const stompClientRef = useRef<Client | null>(null);
  const [page, setPage] = useState(1)


  useEffect(() => {
    const getUnreadNotifications = async() => {
      try {
        const res = await fetch(`https://localhost:8080/api/notifications/unread/${user?.id}?page=${page}&amount=3`, {
          mode: "cors",
          headers: {
              'Authorization': `${user?.accessToken ? `Bearer ${user?.accessToken}` : null}`
          }
      })
      const data = await res.json()
      setNotifications(data.body.map((n: any) => ({
        id: n.id,
        message: n.message,
        createdAt: n.createdAt
      })));
      
      console.log("messagase", data)
      } catch (error) {
        console.log(error)
      }
    }

    getUnreadNotifications()
  }, [user, page])

  return (
    <>
      <div
        className={`${theme === "dark" ? "bg-SecondaryColor" : "bg-[#B5B5B5]"} hover:bg-AccnetColor w-14 h-14 rounded-[9px] flex items-center justify-center cursor-pointer relative`}
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <svg className={`w-6 h-6`}>
          <use href={`/sprite.svg#iconNotification`} />
        </svg>
        {notifications && notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </div>

      {showNotifications && (
        <div
          ref={dropdownRef}
          className={`absolute w-[370px] z-10 ${
            theme === "dark" ? "bg-SecondaryColor" : "bg-[#B5B5B5]"
          } p-3 top-[100px] right-[30px] flex flex-col gap-4 rounded-[11px]`}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Повідомлення</h3>
          </div>
          {notifications && notifications.length > 0 ? (
            <ul className="space-y-3 max-h-[400px] overflow-y-auto">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`flex gap-2 items-center p-3 ${
                    theme === "dark" ? "bg-MainColor" : "bg-[#EAEAEA]"
                  } rounded-[10px]`}
                >
                  <Image
                    src="/person.png"
                    alt="default person"
                    width={53}
                    height={53}
                  />
                  <div className="flex flex-col">
                    <span>{notif.message}</span>
                    <span className="text-sm text-gray-400">{parseDate(notif.createdAt)}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400">Немає нових повідомлень</p>
          )}
        </div>
      )}
    </>
  );
};

export default Notifications;






  // useEffect(() => {
  //   console.log("🔵 Notifications useEffect triggered, user:", user?.id);
  //   if (!user) {
  //     console.log("🔴 No user - skipping WebSocket setup");
  //     return;
  //   }

  //   const socketUrl = "https://localhost:8080/ws";
  //   console.log("🟡 Attempting to connect to WebSocket:", socketUrl);
    
  //   const socket = new SockJS(socketUrl);
  //   const stompClient = new Client({
  //     webSocketFactory: () => socket,
  //     reconnectDelay: 5000,
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,
  //     debug: (str) => console.log(`🟠 STOMP debug: ${str}`),
  //   });

  //   stompClient.onConnect = (frame) => {
  //     console.log("🟢 WebSocket CONNECTED. Frame:", frame);
  //     stompClient.subscribe(
  //       `/user/queue/notifications`,
  //       (message) => {
  //         console.log("📩 New message received:", message);
  //         const newNotification = {
  //           id: Date.now().toString(),
  //           text: message.body,
  //           time: new Date().toLocaleTimeString(),
  //         };
  //         console.log("➕ Adding new notification:", newNotification);
  //         setNotifications((prev) => [newNotification, ...prev]);
  //       }
  //     );
  //   };

  //   stompClient.onStompError = (frame) => {
  //     console.error("🔴 STOMP Error:", frame.headers["message"]);
  //     console.error("Full error frame:", frame);
  //   };

  //   stompClient.onWebSocketError = (event) => {
  //     console.error("🔴 WebSocket Error:", event);
  //   };

  //   stompClient.onDisconnect = () => {
  //     console.log("🟠 WebSocket DISCONNECTED");
  //   };

  //   stompClient.activate();
  //   stompClientRef.current = stompClient;
  //   console.log("🟣 STOMP client activated");

  //   return () => {
  //     console.log("🟤 Cleanup - deactivating STOMP client");
  //     if (stompClientRef.current) {
  //       stompClientRef.current.deactivate();
  //     }
  //   };
  // }, [user]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setShowNotifications(false);
  //     }
  //   };

  //   if (showNotifications) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [showNotifications]);

  // const clearNotifications = () => {
  //   setNotifications([]);
  // };

  // useEffect(() => {
  //   console.log(notifications);
  // }, [notifications]);