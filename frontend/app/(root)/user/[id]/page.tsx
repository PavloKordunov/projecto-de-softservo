"use client"

import Post from "@/components/Post";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserPage = () => {

    const [posts, setPosts] = useState<any[]>([])
    const [user, setUser] = useState<any>(null)
        const params = useParams();
        const userId = params.id;

        console.log(userId)
    
    useEffect(() => {
        const getAllPost = async() => {
            const res = await fetch("http://localhost:8080/api/posts")
            const data = await res.json()
            setPosts(data.body)
            console.log(data)
        } 
        const getUserById = async() => {
            const res = await fetch(`http://localhost:8080/api/users/id/${userId}`)
            const  data = await res.json()
            setUser(data.body)
            console.log(data)
        } 
    
        getUserById()
    
        getAllPost()
    }, [])

    return (
        <div className="px-3 py-12 mt-4 bg-MainColor rounded-[21px] mb-6 w-[1050px]">
            <div className="flex items-center ml-9 mb-8">
                <div className="flex gap-3 items-center mr-28">
                    <Image src="/person.png" alt="" width={110} height={110} />
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-6 items-center">
                            <p className="text-white text-[48px] font-semibold leading-[48px] m-0">{user?.name}</p>
                            <svg className="w-9 h-8" fill="#fff">
                                <use href={`/sprite.svg#changeProfileIcon`} />
                            </svg>
                        </div>
                        <p className="text-[#97989D] text-[24px] font-semibold leading-[24px] m-0">@{user?.username}</p>
                    </div>
                </div>
                <div className="flex items-center gap-24">
                    <div className="flex flex-col items-center">
                        <p className="text-white text-[26px] font-semibold leading-[26px] m-0">{user?.following}</p>
                        <p className="text-white text-[26px] font-semibold leading-[26px] m-0">Читачі</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-white text-[26px] font-semibold leading-[26px] m-0">{user?.subscribers}</p>
                        <p className="text-white text-[26px] font-semibold leading-[26px] m-0">Стежень</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-white text-[26px] font-semibold leading-[26px] m-0">10</p>
                        <p className="text-white text-[26px] font-semibold leading-[26px] m-0">Дописів</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center ml-9 gap-6 mb-10">
                <button className="px-5 py-3 bg-[#434C55] rounded-[31px] text-white text-[16px] font-bold">Дописи</button>
                <button className="px-5 py-3 bg-[#434C55] rounded-[31px] text-white text-[16px] font-bold">Вподобання</button>
                <button className="px-5 py-3 bg-[#434C55] rounded-[31px] text-white text-[16px] font-bold">Збережені</button>
                <button className="px-5 py-3 bg-[#434C55] rounded-[31px] text-white text-[16px] font-bold">Мої оцінки</button>
            </div>

            {/* Divider */}
            <div className="border-t border-[#434C55] mb-6"></div>

            <div className="flex items-center ml-9 gap-6 mb-6">
                <button className="px-3 py-2 bg-AccnetColor rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center">
                    <p>За вподобаннями</p>
                    <svg className="w-4 h-3 rotate-180" fill="#fff">
                        <use href={`/sprite.svg#iconArrowDown`} />
                    </svg>
                </button>
                <button className="px-3 py-2 bg-[#434C55] rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center">
                    <p>За вподобаннями</p>
                </button>
                <button className="px-3 py-2 bg-[#434C55] rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center">
                    <p>За вподобаннями</p>
                </button>
            </div>

            {posts.length > 0 ? (
                posts.map((post) => <Post key={post.id} post={post} className="bg-[#262D34]" />)
            ) : (
                <p>Поки що немає постів...</p>
            )}
        </div>
    );
};

export default UserPage;
