import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import { useTheme } from "next-themes";

const Notifications = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const { theme, setTheme } = useTheme();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const notifications = [
        { id: 1, text: "Користувач Арнольд Шварценегер підписався на вас", time: "5 хв тому" },
        { id: 2, text: "Користувач Арнольд Шварценeгер вподобав ваш пост", time: "1 год тому" },
        { id: 3, text: "Користувач Арнольд Шварценeгер відповів на ваш пост", time: "2 год тому" },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };

        if (showNotifications) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showNotifications]);

    return (
        <>
            <div
                className={`${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} hover:bg-AccnetColor w-14 h-14 rounded-[9px] flex items-center justify-center cursor-pointer`}
                onClick={() => setShowNotifications(!showNotifications)}
            >
                <svg className={`w-6 h-6 `}>
                    <use href={`/sprite.svg#iconNotification`} />
                </svg>
            </div>

            {showNotifications && (
                <div ref={dropdownRef} className={`absolute w-[370px] z-10 ${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} p-3 top-[100px] right-[30px] flex flex-col gap-4 rounded-[11px]`}>
                    <h3 className="text-lg font-semibold">Повідомлення</h3>
                    {notifications.length > 0 ? (
                        <ul className="space-y-3">
                            {notifications.map((notif) => (
                                <li key={notif.id} className={`flex gap-2 items-center p-3 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} rounded-[10px]`}>
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
