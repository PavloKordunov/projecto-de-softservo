import Image from "next/image";
import { useState } from "react";

const Notifications = () => {
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, text: "Користувач Арнольд Шварценегер підписався на вас", time: "5 хв тому" },
        { id: 2, text: "Користувач Арнольд Шварценeгер вподобав ваш пост", time: "1 год тому" },
        { id: 3, text: "Користувач Арнольд Шварценeгер відповів на ваш пост", time: "2 год тому" },
    ];

    return (
        <>
            <div
                className="bg-SecondaryColor hover:bg-AccnetColor w-14 h-14 rounded-[9px] flex items-center justify-center cursor-pointer"
                onClick={() => setShowNotifications(!showNotifications)}
            >
                <svg className="w-6 h-6">
                    <use href={`/sprite.svg#iconNotification`} />
                </svg>
            </div>

            {showNotifications && (
                <div className="absolute w-[370px] z-10 bg-SecondaryColor p-3 top-[100px] right-[37px] flex flex-col gap-4 rounded-[11px]">
                    <h3 className="text-lg font-semibold">Повідомлення</h3>
                    {notifications.length > 0 ? (
                        <ul className="space-y-3">
                            {notifications.map((notif) => (
                                <li key={notif.id} className="flex gap-2 items-center p-3 bg-MainColor rounded-[10px]">
                                    <Image src="/person.png" alt="default person" width={53} height={53} />
                                        <span>{notif.text}</span>
                                        {/* <span className="text-sm text-gray-400">{notif.time}</span> */}
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
