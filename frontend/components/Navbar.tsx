"use client";

import { useUser } from "@/hooks/useUser";
import { useOktaAuth } from "@okta/okta-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavBar = () => {
    const [show, setShow] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const { user, setUser } = useUser();
    const { oktaAuth, authState } = useOktaAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (authState?.isAuthenticated) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [authState]);

    const handleLogout = async () => {
        await oktaAuth.signOut();
        setUser(null);
    };

    const handleShow = () => {
        setShow((prev) => !prev);
    };

    return (
        <div className="w-full py-4 px-10 bg-MainColor flex items-center flex-1 justify-between">
            <div>
                <p className="text-AccnetColor font-bold text-[30px]">Logo</p>
            </div>
            <div className="flex gap-6 items-center relative">
                <Link href="/home" className="hidden xl:bg-SecondaryColor xl:w-14 xl:h-14 xl:rounded-[9px] xl:flex items-center justify-center">
                    <svg className="w-6 h-6">
                        <use href={`/sprite.svg#iconHome`} />
                    </svg>
                </Link>
                <div className="hidden xl:bg-SecondaryColor xl:w-14 xl:h-14 xl:rounded-[9px] xl:flex items-center justify-center">
                    <svg className="w-6 h-6">
                        <use href={`/sprite.svg#CalendarIcon`} />
                    </svg>
                </div>
                <Link href="/group" className="hidden xl:bg-SecondaryColor xl:w-14 xl:h-14 xl:rounded-[9px] xl:flex items-center justify-center">
                    <svg className="w-6 h-6">
                        <use href={`/sprite.svg#iconCommunity`} />
                    </svg>
                </Link>
                <div className="relative">
                    <input
                        type="text"
                        className="md:w-[300px] lg:w-[480px] 2xl:w-[580px] h-14 px-4 py-2 text-white bg-SecondaryColor border-none rounded-[10px] focus:outline-none"
                        placeholder="Введіть для пошуку..."
                    />
                    <svg className="w-6 h-6 absolute top-1/2 right-3 transform -translate-y-1/2">
                        <use href={`/sprite.svg#iconSearch`} />
                    </svg>
                </div>
            </div>
            <div className="flex gap-6 items-center">
                <div className="bg-SecondaryColor w-14 h-14 rounded-[9px] flex items-center justify-center">
                    <svg className="w-6 h-6">
                        <use href={`/sprite.svg#iconMessage`} />
                    </svg>
                </div>
                <div
                    className="bg-SecondaryColor w-14 h-14 rounded-[9px] flex items-center justify-center cursor-pointer"
                    onClick={() => setShowNotification(!showNotification)}
                >
                    <svg className="w-6 h-6">
                        <use href={`/sprite.svg#iconNotification`} />
                    </svg>
                </div>
                <div className="flex gap-4 items-center cursor-pointer" onClick={handleShow}>
                    <div className="bg-SecondaryColor w-14 h-14 rounded-[9px] flex items-center justify-center">
                        {user?.img ? (
                            <Image src={user.img} alt="person" width={45} height={40} className="rounded-[6px]" />
                        ) : (
                            <Image src="/NavPerson.png" alt="default person" width={45} height={40} />
                        )}
                    </div>
                    {user && <span className="text-white text-[21px] font-bold">{user.name}</span>}
                    <svg className="w-4 h-3">
                        <use href={`/sprite.svg#iconArrowDown`} />
                    </svg>
                </div>
            </div>
            {show && user && (
                <div className="absolute w-[248px] bg-MainColor p-3 top-[100px] right-[37px] flex flex-col justify-center gap-4 rounded-[11px]">
                    <Link href={`/user/${user.id}`} className="flex items-center gap-4">
                        {user.img ? (
                            <Image src={user.img} alt="person" width={53} height={53} className="rounded-full" />
                        ) : (
                            <Image src="/NavPerson.png" alt="default person" width={53} height={53} />
                        )}
                        <div>
                            <p className="text-white text-[16px] font-semibold">View Profile</p>
                            <p className="text-[#97989D] text-[12px]">@{user.username}</p>
                        </div>
                    </Link>
                    <div className="ml-2 flex items-center gap-4">
                        <svg className="w-8 h-8" fill="#fff">
                            <use href={`/sprite.svg#NavThemeIcon`} />
                        </svg>
                        <p className="text-white text-[14px] font-semibold">Dark Mode</p>
                        <div className="bg-SecondaryColor w-[58px] h-[31px] rounded-[35px] px-[4px] py-[3px] flex justify-end">
                            <div className="bg-white w-[25px] h-[25px] rounded-full"></div>
                        </div>
                    </div>
                    <div className="ml-2 flex items-center gap-4">
                        <svg className="w-8 h-8" fill="#fff">
                            <use href={`/sprite.svg#NavSettingsIcon`} />
                        </svg>
                        <p className="text-white text-[14px] font-semibold">Settings</p>
                    </div>
                    <Link href="/admin-page" className="ml-2 flex items-center gap-4">
                        <svg className="w-8 h-8" fill="#fff">
                            <use href={`/sprite.svg#iconCrown`} />
                        </svg>
                        <p className="text-white text-[14px] font-semibold">Admin Page</p>
                    </Link>
                    {isAuthenticated && (
                        <div className="ml-2 flex items-center gap-4 cursor-pointer" onClick={handleLogout}>
                            <svg className="w-8 h-8" fill="#fff">
                                <use href={`/sprite.svg#NavExitIcon`} />
                            </svg>
                            <p className="text-white text-[14px] font-semibold">Log out</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NavBar;
