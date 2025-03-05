"use client"

import Post from "@/components/Post";
import Image from "next/image";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";

const UserPage = () => {

    const [posts, setPosts] = useState<any[]>([])
    const [user, setUser] = useState<any>(null)
    const params = useParams();
    const userId = params.id;

    console.log(userId)

    useEffect(() => {
        const getAllPost = async () => {
            const res = await fetch("http://localhost:8080/api/posts")
            const data = await res.json()
            setPosts(data.body)
            console.log(data)
        }
        const getUserById = async () => {
            const res = await fetch(`http://localhost:8080/api/users/id/${userId}`)
            const data = await res.json()
            setUser(data.body)
            console.log(data)
        }

        getUserById()

        getAllPost()
    }, [])

    return (
        <div className="md:px-3 md:py-12 p-[10px] m-[10px] md:mt-4 bg-MainColor rounded-[21px] md:mb-6 relative lg:w-[1050px]">
            <div className="flex items-center  ml-[10px] md:ml-9 mb-8 relative">
                <div className="flex gap-3 items-center md:mr-28 mr-[30px]">
                    <Image src="/person.png" alt="" width={110} height={110} className="md:w-[110px] rounded-full md:border-[5px] border-[2px] border-AccnetColor md:h-[110px]"/>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-[15px] md:gap-6 items-center">
                            <p className="text-white text-[28px] md:text-[48px] font-semibold leading-[48px] m-0">{user?.nickName}</p>
                            <svg className="md:w-9 md:h-8 w-[20px] h-[20px]" fill="#fff">
                                <use href={`/sprite.svg#changeProfileIcon`}/>
                            </svg>
                        </div>
                        <p className="text-[#97989D] text-[24px] font-semibold leading-[24px] m-0">@{user?.firstName}</p>
                    </div>
                </div>
                <div className="flex items-center w-full gap-[50px] md:gap-24 justify-center relative">
                    <div className="flex flex-col md:gap-[10px] items-center">
                        <p className="text-white text-[18px] md:text-[26px] font-semibold leading-[26px] m-0">{user?.following}</p>
                        <p className="text-white text-[16px] md:text-[26px] font-semibold leading-[26px] m-0">Читачі</p>
                    </div>
                    <div className="flex flex-col items-center md:gap-[10px]">
                        <p className="text-white text-[18px] md:text-[26px] font-semibold leading-[26px] m-0">{user?.subscribers}</p>
                        <p className="text-white text-[16px] md:text-[26px] font-semibold leading-[26px] m-0">Стежень</p>
                    </div>
                    <div className="flex flex-col items-center md:gap-[10px]">
                        <p className="text-white text-[18px] md:text-[26px] font-semibold leading-[26px] m-0">10</p>
                        <p className="text-white text-[16px] md:text-[26px] font-semibold leading-[26px] m-0">Дописів</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center  md:ml-9 gap-[15px] md:gap-6 mb-10">
                <button
                    className="md:px-5 md:py-3 hover:bg-AccnetColor p-[10px] bg-[#434C55] rounded-[10px] text-white md:text-[16px] text-[12px] font-bold">Дописи
                </button>
                <button
                    className="md:px-5 md:py-3 hover:bg-AccnetColor p-[10px] bg-[#434C55] rounded-[10px] text-white md:text-[16px] text-[12px] font-bold">Вподобання
                </button>
                <button
                    className="md:px-5 md:py-3 hover:bg-AccnetColor p-[10px] bg-[#434C55] rounded-[10px] text-white md:text-[16px] text-[12px] font-bold">Збережені
                </button>
                <button
                    className="md:px-5 md:py-3 hover:bg-AccnetColor p-[10px] bg-[#434C55] rounded-[10px] text-white md:text-[16px] text-[12px] font-bold">Мої
                    оцінки
                </button>
            </div>

            {/* Divider */}
            <div className="border-t border-[#434C55] w-full mb-6"></div>

            <div className="flex items-center md:ml-9  gap-[10px] md:gap-6 mb-6">
                <button
                    className="md:px-3 md:py-2 p-[7px] bg-AccnetColor rounded-[8px] text-white text-[12px] md:text-[16px] font-bold gap-1 flex items-center">
                    <p>За вподобаннями</p>
                    <svg className="w-4 h-3 rotate-180" fill="#fff">
                        <use href={`/sprite.svg#iconArrowDown`}/>
                    </svg>
                </button>
                <button
                    className="md:px-3 md:py-2 p-[7px] bg-[#434C55] rounded-[8px] text-white text-[12px] md:text-[16px] font-bold gap-1 flex items-center">
                    <p>За вподобаннями</p>
                </button>
                <button
                    className="md:px-3 md:py-2 p-[7px] bg-[#434C55] rounded-[8px] text-white text-[12px] md:text-[16px] font-bold gap-1 flex items-center">
                    <p>За вподобаннями</p>
                </button>
            </div>

            {posts.length > 0 ? (
                posts.map((post) => <Post key={post.id} post={post} className="bg-[#262D34]"/>)
            ) : (
                <p>Поки що немає постів...</p>
            )}
        </div>
    );
};

export default UserPage;
