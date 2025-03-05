import { useState } from "react";

const Notifications = () => {
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, text: "Ви отримали нове повідомлення", time: "5 хв тому" },
        { id: 2, text: "Ваш запис підтверджено", time: "1 год тому" },
        { id: 3, text: "Новий коментар до вашого поста", time: "2 год тому" },
    ];

    return (
        <div className="relative">
            <div
                className="bg-SecondaryColor hover:bg-AccnetColor w-14 h-14 rounded-[9px] flex items-center justify-center cursor-pointer"
                onClick={() => setShowNotifications(!showNotifications)}
            >
                <svg className="w-6 h-6">
                    <use href={`/sprite.svg#iconNotification`} />
                </svg>
            </div>

            {showNotifications && (
                <div className="absolute top-16 right-0 w-80 bg-MainColor text-white p-4 rounded-[10px] shadow-lg z-10">
                    <h3 className="text-lg font-semibold mb-3">Повідомлення</h3>
                    {notifications.length > 0 ? (
                        <ul className="space-y-3">
                            {notifications.map((notif) => (
                                <li key={notif.id} className="flex justify-between items-center p-3 bg-SecondaryColor rounded-lg">
                                    <span>{notif.text}</span>
                                    <span className="text-sm text-gray-400">{notif.time}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-400">Немає нових повідомлень</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notifications;
