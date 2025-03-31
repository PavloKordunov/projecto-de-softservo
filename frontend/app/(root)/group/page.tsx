"use client"

import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const GroupPage = () => {
    const [groups, setGroups] = useState<any[]>([]);
    const [userSubscribed, setUserSubscribed] = useState<any[]>([]);
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
    const { user } = useUser();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const getAllGroups = async () => {
            const res = await fetch("https://localhost:8080/api/groups", {
                mode: "cors",
            });
            const data = await res.json();
            setGroups(data.body);
        };

        const getFollowedGroups = async () => {
            try {
                const res = await fetch(`https://localhost:8080/api/groups/followed/${user?.id}`, {
                    mode: "cors",
                });
                const data = await res.json();
                setUserSubscribed(data.body);
            } catch (error) {
                console.log(error);
            }
        };

        getFollowedGroups();
        getAllGroups();
    }, [user]);

    const subscribeUser = async (title: string, groupId: string) => {
        setLoading(prev => ({ ...prev, [groupId]: true }));
        try {
            const res = await fetch(`https://localhost:8080/api/groups/${title}/follow/${user?.id}`, {
                mode: "cors",
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.accessToken}`,
                },
            });
            const data = await res.json();

            setUserSubscribed(prev => {
                if (prev.some(subscribedGroup => subscribedGroup.id === groupId)) {
                    return prev.filter(subscribedGroup => subscribedGroup.id !== groupId);
                } else {
                    return [...prev, { id: groupId }];
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(prev => ({ ...prev, [groupId]: false }));
        }
    };

    return (
        <div>
            {groups.map(group => (
                <Link key={group.id} href={`/group/${group.id}`} className={`mt-4 p-4 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} rounded-[21px] flex items-center h-fit w-[1030px] gap-4`}>
                    {group.image ? <Image src={group.image} alt="" width="208" height="237" /> :<Image src="/postImage.png" alt="" width="208" height="237" />}
                    <div className="w-full">
                        <div className="flex items-center justify-between mb-4">
                            <p className={`text-[24px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>/{group?.title}</p>
                            <div className="flex items-end gap-4">
                                <button
                                    className={`px-4 py-2 bg-AccnetColor rounded-[10px] ${theme === 'dark' ? 'text-white' : 'text-black'} text-[22px] font-semibold`}
                                    onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        subscribeUser(group?.title, group.id);
                                    }}
                                    disabled={loading[group.id]}
                                >
                                    {loading[group.id] ? (
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                    ) : userSubscribed?.some(subscribeGroup => subscribeGroup.id === group.id) ? "Відписатись" : "Підписатись"}
                                </button>
                            </div>
                        </div>
                        <p className={`text-[14px] ${theme === 'dark' ? 'text-white' : 'text-black'} mb-6 line-clamp-3`}>
                            <strong>Опис: </strong>{group?.description}
                        </p>
                        <div className="flex justify-between">
                            <div className="flex gap-3 items-center mb-3">
                                <div className={`py-2 w-fit px-3 ${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} rounded-[24px]`}>
                                    <p className={`text-[13px]  ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} font-semibold`}>фільм</p>
                                </div>
                                <div className={`py-2 w-fit px-3 ${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} rounded-[24px]`}>
                                    <p className={`text-[13px]  ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} font-semibold`}>хоррор</p>
                                </div>
                                <div className={`py-2 w-fit px-3 ${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} rounded-[24px]`}>
                                    <p className={`text-[13px]  ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} font-semibold`}>страшний</p>
                                </div>
                            </div>
                            <p className={`text-[14px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold mr-4 mt-1`}>317,731 Підписників</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default GroupPage;
