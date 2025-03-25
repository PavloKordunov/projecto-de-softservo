'use client'

import { useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useOktaAuth } from "@okta/okta-react";
import ThemeSwitch from "@/components/ThemeSwitch";

const UserMenu = () => {
    const [show, setShow] = useState(false);
    const { user, setUser } = useUser();
    const { oktaAuth, authState } = useOktaAuth();

    const isAuthenticated = authState?.isAuthenticated || false;

    const handleLogout = async () => {
        await oktaAuth.signOut();
        setUser(null);
    };

    const handleShow = () => setShow(prev => !prev);

    const renderImage = (src: string, width: number, height: number, alt: string) => (
        <Image src={src} alt={alt} width={width} height={height} className="rounded-full" />
    );

    return (
        <div>
            <div className="flex gap-[5px] items-center cursor-pointer" onClick={handleShow}>
                <div className="bg-SecondaryColor w-14 h-14 rounded-[9px] mr-2 flex items-center justify-center">
                    {user?.img ? renderImage(user.img, 45, 40, "person") : renderImage("/NavPerson.png", 45, 40, "default person")}
                </div>
                <p className="text-white text-[21px] font-bold">{user?.firstName}</p>
                <svg className="w-4 h-3">
                    <use href={`/sprite.svg#iconArrowDown`} />
                </svg>
            </div>

            {show && (
                <div className="absolute w-[248px] z-10 bg-MainColor p-3 top-[100px] right-[37px] flex flex-col gap-4 rounded-[11px]">
                    <Link href={`/user/${user?.id}`} className="flex items-center gap-4">
                        {renderImage(user?.img || "/NavPerson.png", 53, 53, "person")}
                        <div>
                            <p className="text-white text-[16px] font-semibold">{user?.firstName}</p>
                            <p className="text-[#97989D] text-[12px]">@{user?.nickName}</p>
                        </div>
                    </Link>

                    <ThemeSwitch />
                    <MenuOption icon="NavSettingsIcon" label="Settings" />
                    <Link href="/admin-page" className="ml-2 flex items-center gap-4">
                        <Icon name="iconCrown" />
                        <p className="text-white text-[14px] font-semibold">Admin Page</p>
                    </Link>
                    {isAuthenticated && (
                        <div className="ml-2 flex items-center gap-4 cursor-pointer" onClick={handleLogout}>
                            <Icon name="NavExitIcon" />
                            <p className="text-white text-[14px] font-semibold">Log out</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const MenuOption = ({ icon, label }: { icon: string, label: string }) => (
    <div className="ml-2 flex items-center gap-4">
        <Icon name={icon} />
        <p className="text-white text-[14px] font-semibold">{label}</p>
    </div>
);

const Icon = ({ name }: { name: string }) => (
    <svg className="w-8 h-8" fill="#fff">
        <use href={`/sprite.svg#${name}`} />
    </svg>
);

export default UserMenu;
