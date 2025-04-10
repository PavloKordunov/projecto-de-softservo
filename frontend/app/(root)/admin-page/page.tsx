"use client"

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useUser } from "@/hooks/useUser";

const AdminPage = () => {
    const { theme } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tagName, setTagName] = useState("");
    const {user} = useUser()

    const handleCreateTag = async() => {
        if (!tagName.trim()) return;
        try {
            const res = await fetch(`https://localhost:8080/api/tags/create`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${user?.accessToken ? `Bearer ${user?.accessToken}` : null}`
                },
                body: JSON.stringify({name: tagName})
            })
            const data = await res.json()
            setTagName("");
            setIsModalOpen(false);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className={`p-6 mt-4 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#E4E3E3]'} rounded-[21px] flex gap-3 mb-6 w-[1030px]`}>
                <Link href='/create-topic' className={`px-4 py-2 w-[200px] ${theme === 'dark' ? 'bg-SecondaryColor text-white' : 'bg-[#B5B5B5] text-black'} flex hover:bg-AccnetColor rounded-[10px] items-center justify-center text-[20px] h-[70px] font-semibold`}>
                    Створити пост
                </Link>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className={`px-4 py-2 w-[200px] ${theme === 'dark' ? 'bg-SecondaryColor text-white' : 'bg-[#B5B5B5] text-black'} flex hover:bg-AccnetColor rounded-[10px] items-center justify-center text-[20px] h-[70px] font-semibold`}>
                    Створити тег
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-900 p-6 rounded-lg text-center w-80">
                        <h2 className="text-white text-lg font-semibold">Введіть назву тега</h2>
                        <div className="mt-4 flex flex-col gap-3">
                            <input
                                className="bg-gray-700 text-white p-2 rounded outline-none"
                                type="text"
                                placeholder="Назва тега"
                                value={tagName}
                                onChange={(e) => setTagName(e.target.value)}
                            />
                            <button
                                className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-red-500"
                                onClick={handleCreateTag}
                            >
                                Створити
                            </button>
                            <button
                                className="text-sm text-gray-400 hover:text-white mt-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Скасувати
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminPage;
