"use client"

import EditProfile from "@/components/EditProfile";
import Post from "@/components/Post";
import { useUser } from "@/hooks/useUser";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserPage = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [userState, setUserState] = useState<any>(null);
    const params = useParams();
    const userId = params.id;
    const { user } = useUser(); 
    const [showUpdateUser, setShowUpdateUser] = useState(false);

    useEffect(() => {
        const getUserPost = async () => {
            const res = await fetch(`https://localhost:8080/api/posts/user/${userId}`, {
                mode: "cors",
            });
            const data = await res.json();
            setPosts(data.body);
            console.log(data);
        };

        const getUserById = async () => {
            const res = await fetch(`https://localhost:8080/api/users/id/${userId}`, {
                mode: "cors",
            });
            const data = await res.json();
            setUserState(data.body); 
            console.log(data);
        };

        getUserById();
        getUserPost();
    }, [userId]);

    const handleShow = () => {
        setShowUpdateUser(!showUpdateUser);
    };

    const subscribeUser = async () => {
        try {
            const res = await fetch(`https://localhost:8080/api/users/follow-user/${userId}`, {
                mode: "cors",
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.accessToken}`
                },
            });

            if (!res.ok) {
                throw new Error(`Failed to update post: ${res.status}`);
            }

            const data = await res.json();
            console.log("Follow user:", data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
       console.log(user) 
    }, [])

    return (
        <div className="px-3 py-12 mt-4 bg-MainColor rounded-[21px] mb-6 w-[1050px]">
            <div className="flex items-center ml-9 mb-8">
                <div className="flex gap-3 items-center mr-28">
                    <div className="h-[110px] w-[110px] rounded-[50%] overflow-hidden">
                        {userState?.profileImage ? <Image src={userState?.profileImage} alt="" width={110} height={110} /> : <Image src="/person.png" alt="" width={110} height={110} />}
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-6 items-center">
                            <p className="text-white text-[48px] font-semibold leading-[48px] m-0">{userState?.firstName}</p>
                            {userId === user?.id && ( 
                                <svg className="w-9 h-8" fill="#fff" onClick={handleShow}>
                                    <use href={`/sprite.svg#changeProfileIcon`} />
                                </svg>
                            )}
                        </div>
                        <p className="text-[#97989D] text-[24px] font-semibold leading-[24px] m-0">@{userState?.nickName}</p> 
                    </div>
                </div>
                <div className="flex items-center gap-24">
                    <div className="flex flex-col items-center">
                        <p className="text-white text-[26px] font-semibold leading-[26px] m-0">{userState?.following}</p> 
                        <p className="text-white text-[26px] font-semibold leading-[26px] m-0">Читачі</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-white text-[26px] font-semibold leading-[26px] m-0">{userState?.subscribers}</p> 
                        <p className="text-white text-[26px] font-semibold leading-[26px] m-0">Стежень</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-white text-[26px] font-semibold leading-[26px] m-0">{userState?.createdPosts}</p>
                        <p className="text-white text-[26px] font-semibold leading-[26px] m-0">Дописів</p>
                    </div>
                </div>
            </div>

            {user?.id !== userId && <div className="flex items-center ml-9 gap-6 mb-5">
                <button onClick={subscribeUser} className="px-4 py-1 bg-[#434C55] rounded-[31px] text-white text-[16px] font-bold">підписатись</button>
                <button className="px-4 py-1 bg-[#434C55] rounded-[31px] text-white text-[16px] font-bold">Написати</button>
            </div>}

            <div className="flex items-center ml-9 gap-6 mb-10">
                <button className="px-5 py-3 bg-[#434C55] rounded-[31px] text-white text-[16px] font-bold">Дописи</button>
                <button className="px-5 py-3 bg-[#434C55] rounded-[31px] text-white text-[16px] font-bold">Вподобання</button>
                <button className="px-5 py-3 bg-[#434C55] rounded-[31px] text-white text-[16px] font-bold">Збережені</button>
                <button className="px-5 py-3 bg-[#434C55] rounded-[31px] text-white text-[16px] font-bold">Мої оцінки</button>
            </div>

            <div className="border-t border-[#434C55] mb-6"></div>

            <div className="flex items-center ml-9 gap-6 mb-6">
                <button className="px-3 py-2 bg-AccnetColor rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center">
                    <p>За вподобаннями</p>
                    <svg className="w-4 h-3 rotate-180" fill="#fff">
                        <use href={`/sprite.svg#iconArrowDown`} />
                    </svg>
                </button>
                <button className="px-3 py-2 bg-[#434C55] rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center">
                    <p>За перглядами</p>
                </button>
                <button className="px-3 py-2 bg-[#434C55] rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center">
                    <p>За датою</p>
                </button>
            </div>

            {posts ? (
                posts.map((post) => <Post key={post.id} post={post} className="bg-[#262D34]" />)
            ) : (
                <p>Поки що немає постів...</p>
            )}

            {showUpdateUser && (
                <EditProfile handleShow={handleShow} />
            )}
        </div>
    );
};

export default UserPage;