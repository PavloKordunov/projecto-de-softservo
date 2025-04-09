"use client"

import { useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useOktaAuth } from "@okta/okta-react";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const UserMenu = () => {
    const [show, setShow] = useState(false);
    const { user, setUser } = useUser();
    const { oktaAuth, authState } = useOktaAuth();
    const { theme } = useTheme();
    const router = useRouter();
    const isAuthenticated = authState?.isAuthenticated || false;
    const [userState, setUserState] = useState<any>(null);

    const handleLogout = async () => {
        await oktaAuth.signOut();
        setUser(null);
    };

    const handleLoginRedirect = () => {
        router.push('/login');
    };

    const handleProfileClick = () => {
        if (!isAuthenticated) {
            setTimeout(() => {
                router.push("/login");
            }, 0);
        } else {
            router.push(`/user/${user?.id}`);
        }
    };

    useEffect(() => {
        const getUserById = async () => {
            const res = await fetch(`https://localhost:8080/api/users/id/${user?.id}`, {
                mode: "cors",
            });
            const data = await res.json();
            setUserState(data.body); 
            console.log(data);
        };

        getUserById();
    }, []);


    const handleShow = () => setShow(prev => !prev);

    const renderImage = (src: string, width: number, height: number, alt: string) => (
        <Image src={src} alt={alt} width={width} height={height} className="rounded-full" />
    );

    return (
        <div>
            <div className="flex gap-[5px] items-center cursor-pointer" onClick={handleShow}>
                <div className="h-[45px] w-[45px] rounded-[50%] overflow-hidden">
                    {userState?.profileImage ? <Image src={userState?.profileImage} alt="" width={45} height={45} /> : <Image src="/person.png" alt="" width={110} height={110} />}
                </div>
                <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-[21px] font-bold`}>{user?.firstName}</p>
                <svg className="w-4 h-3">
                    <use href={`/sprite.svg#iconArrowDown`} />
                </svg>
            </div>

            {show && (
                <div className={`absolute w-[248px] z-10 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} p-3 top-[100px] right-[37px] flex flex-col gap-4 rounded-[11px]`}>
                    <div className="flex items-center gap-4 cursor-pointer" onClick={handleProfileClick}>
                    <div className="h-[45px] w-[45px] rounded-[50%] overflow-hidden">
                        {userState?.profileImage ? <Image src={userState?.profileImage} alt="" width={45} height={45} /> : <Image src="/person.png" alt="" width={110} height={110} />}
                    </div>
                        <div>
                            <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-[16px] font-semibold`}>{user?.firstName}</p>
                            <p className="text-[#97989D] text-[12px]">@{user?.nickName}</p>
                        </div>
                    </div>
                    <div className={`${theme === 'dark' ? 'bg-MainColor' : 'bg-[#B5B5B5]'} p-2 rounded-[10px] shadow`}>
                        <ThemeSwitch />
                    </div>
                    <div className={`${theme === 'dark' ? 'bg-MainColor' : 'bg-[#B5B5B5]'} p-2 rounded-[10px] shadow`}>
                        <Link href="/admin-page" className="ml-2 flex items-center gap-4">
                            <Icon name="iconCrown" />
                            <p className="text-white text-[14px] font-semibold">Admin Page</p>
                        </Link>
                    </div>
                    {!isAuthenticated ? (
                        <div className={`ml-2 p-2 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#B5B5B5]'} rounded-[10px] shadow flex items-center gap-4 cursor-pointer`} onClick={handleLoginRedirect}>
                            <Icon name="NavExitIcon" />
                            <p className="text-white text-[14px] font-semibold">Log in</p>
                        </div>
                    ) : (
                        <div className={`ml-2 p-2 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#B5B5B5]'} rounded-[10px] shadow flex items-center gap-4 cursor-pointer`} onClick={handleLogout}>
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
