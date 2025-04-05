"use client"

import EditProfile from "@/components/EditProfile";
import Post from "@/components/Post";
import { useUser } from "@/hooks/useUser";
import { set } from "date-fns";
import { get } from "http";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { it } from "node:test";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

const UserPage = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [userState, setUserState] = useState<any>(null);
    const params = useParams();
    const userId = params.id;
    const { user } = useUser(); 
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [filterType, setFilterType] = useState<string | null>('createdAt');
    const [sortType, setSortType] = useState<string | null>('desc');
    const { theme } = useTheme();
    const [categorytype, setCategoryType] = useState<string>("posts");
    const [rateTopic, setRateTopic] = useState<any[]>([])

    useEffect(() => {
        const getUserById = async () => {
            const res = await fetch(`https://localhost:8080/api/users/id/${userId}`, {
                mode: "cors",
            });
            const data = await res.json();
            setUserState(data.body); 
            console.log(data);
        };

        getUserById();
    }, [userId]);

    useEffect(() => {
        const getUserPost = async () => {
            const res = await fetch(`https://localhost:8080/api/posts/user/${userId}?sort=${filterType}&order=${sortType}`, {
                mode: "cors",
                headers : {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.accessToken}`
                },
            });
            const data = await res.json();
            setPosts(data.body);
            console.log(data);
        };

        const getUserLikePost = async () => {
            const res = await fetch(`https://localhost:8080/api/posts/user/liked/${userId}?sort=${filterType}&order=${sortType}`, {
                mode: "cors",
                headers : {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.accessToken}`
                }, 
            });
            const data = await res.json();
            setPosts(data.body);
            console.log(data);
        };

        const getUserSavedPost = async () => {
            try {
                const res = await fetch(`https://localhost:8080/api/posts/user/saved/${userId}?sort=${filterType}&order=${sortType}`, {
                    mode: "cors",
                    headers : {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user?.accessToken}`
                    }, 
                });
                const data = await res.json();
                setPosts(data.body);
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }

        const getUserRateTopic = async () => {
            try {
                const res = await fetch(`https://localhost:8080/api/topics/user/${userId}`, {
                    mode: "cors",
                    headers : {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                });
                const data = await res.json();
                setRateTopic(data.body);
                console.log(data);  
            } catch (error) {
                console.log(error)
            }
        }

        if(categorytype === "posts") {
            setPosts([]);
            setRateTopic([])
            getUserPost();
        }
        if(categorytype === "likes") {
            setPosts([]);
            setRateTopic([])
            getUserLikePost();
        }
        if(categorytype === 'saved') {
            setPosts([])
            setRateTopic([])
            getUserSavedPost()
        } 
        if(categorytype === 'rate') {
            setPosts([])
            getUserRateTopic()
        }    
    }, [filterType, sortType, categorytype]);

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
       console.log("Filter type", filterType)
       console.log("Sort type", sortType) 
    }, [filterType, sortType])

    const filterPost = (filterType: string) => {
        if (filterType === "likes") {
            setSortType((prevSortType) => {
                if (prevSortType === null) return "asc";
                if (prevSortType === "asc") return "desc";
                return null;
            });
        } else if (filterType === "viewCount") {
            setSortType((prevSortType) => {
                if (prevSortType === null) return "asc";
                if (prevSortType === "asc") return "desc";
                return null;
            });
        } else if (filterType === "createdAt") {
            setSortType((prevSortType) => {
                if (prevSortType === null) return "asc";
                if (prevSortType === "asc") return "desc";
                return null;
            });
        }
    };
    return (
        <div className={`px-3 py-12 mt-4 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} rounded-[21px] mb-6 w-[1050px]`}>
            <div className="flex items-center ml-9 mb-8">
                <div className="flex gap-3 items-center mr-28">
                    <div className="h-[110px] w-[110px] rounded-[50%] overflow-hidden">
                        {userState?.profileImage ? <Image src={userState?.profileImage} alt="" width={110} height={110} /> : <Image src="/person.png" alt="" width={110} height={110} />}
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-6 items-center">
                            <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-[48px] font-semibold leading-[48px] m-0`}>{userState?.firstName}</p>
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
                        <p className={`${theme === 'dark' ? ' text-white' : ' text-black'} text-[26px] font-semibold leading-[26px] m-0`}>{userState?.following}</p>
                        <p className={`${theme === 'dark' ? ' text-white' : ' text-black'} text-[26px] font-semibold leading-[26px] m-0`}>Читачі</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className={`${theme === 'dark' ? ' text-white' : ' text-black'} text-[26px] font-semibold leading-[26px] m-0`}>{userState?.subscribers}</p>
                        <p className={`${theme === 'dark' ? ' text-white' : ' text-black'} text-[26px] font-semibold leading-[26px] m-0`}>Стежень</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className={`${theme === 'dark' ? ' text-white' : ' text-black'} text-[26px] font-semibold leading-[26px] m-0`}>{userState?.createdPosts}</p>
                        <p className={`${theme === 'dark' ? ' text-white' : ' text-black'} text-[26px] font-semibold leading-[26px] m-0`}>Дописів</p>
                    </div>
                </div>
            </div>

            {user?.id !== userId && <div className="flex items-center ml-9 gap-6 mb-5">
                <button onClick={subscribeUser} className={`px-4 py-1 ${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'} rounded-[31px]  text-[16px] font-bold`}>підписатись</button>
                <button className={`px-4 py-1  rounded-[31px] ${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'} text-[16px] font-bold`}>Написати</button>
            </div>}

            <div className="flex items-center ml-9 gap-6 mb-10">
                <button className={`px-5 py-3 ${categorytype === 'posts' ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}` }  rounded-[31px]  text-[16px] font-bold`} onClick={() => setCategoryType('posts')} >Дописи</button>
                <button className={`px-5 py-3 ${categorytype === 'likes' ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}` }  rounded-[31px]  text-[16px] font-bold`} onClick={() => setCategoryType('likes')} >Вподобання</button>
                <button className={`px-5 py-3 ${categorytype === 'saved' ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}` }  rounded-[31px]  text-[16px] font-bold`} onClick={() => setCategoryType('saved')} >Збережені</button>
                <button className={`px-5 py-3 ${categorytype === 'rate' ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}` }  rounded-[31px]  text-[16px] font-bold`} onClick={() => setCategoryType('rate')} >Мої оцінки</button>
            </div>

            <div className="border-t border-[#434C55] mb-6"></div>

            {categorytype !== "rate" && <div className="flex items-center ml-9 gap-6 mb-6">
                <button className={`px-3 py-2 ${filterType === 'likes' && (sortType === 'asc' || sortType=== "desc") ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}`} rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}
                    onClick={() => {
                        filterPost('likes')
                        setFilterType('likes')
                    }
                    }>
                    <p>За вподобаннями</p>
                    { (filterType === 'likes' && (sortType === 'asc' || sortType=== "desc")) && 
                    <svg className={`w-4 h-3 ${sortType === 'asc' ? 'rotate-180' : ""}`} fill="#fff">
                        <use href={`/sprite.svg#iconArrowDown`} />
                    </svg>
                    }

                </button>
                <button className={`px-3 py-2 ${filterType === 'viewCount' && (sortType === 'asc' || sortType === "desc") ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}` }   rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}
                    onClick={() => {
                        filterPost('viewCount')
                        setFilterType('viewCount')
                    }
                    }>
                    <p>За перглядами</p>
                    { (filterType === 'viewCount' && (sortType === 'asc' || sortType=== "desc")) && 
                    <svg className={`w-4 h-3 ${sortType === 'asc' ? 'rotate-180' : ""}`} fill="#fff">
                        <use href={`/sprite.svg#iconArrowDown`} />
                    </svg>
                    }
                </button>
                <button className={`px-3 py-2 ${filterType === 'createdAt' && (sortType === 'asc' || sortType=== "desc") ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}`}  rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}
                    onClick={() => {    
                        filterPost('createdAt')
                        setFilterType('createdAt')
                    }
                    }>
                    <p>За датою</p>
                    {  (filterType === 'createdAt' && (sortType === 'asc' || sortType=== "desc")) && 
                    <svg className={`w-4 h-3 ${sortType === 'asc' ? 'rotate-180' : ""}`} fill="#fff">
                        <use href={`/sprite.svg#iconArrowDown`} />
                    </svg>
                    }
                </button>
            </div>}

            {posts ? (
                posts.map((post) => <Post key={post.id} post={post} className="bg-[#262D34]" />)
            ) : (
                <p>Поки що немає постів...</p>
            )}

            {rateTopic && (
                rateTopic.map((topic) => 
                    <Link href={`/topics/${topic.id}`} key={topic.id} className='p-6 bg-SecondaryColor rounded-[21px] flex gap-3 mb-6 w-[520px]'>
                        <Image src={topic.image} alt="" width={100} height={150}  />
                        <div>
                            <p className="text-[20px] text-white font-semibold">{topic.title}</p>
                            <p className="text-[16px] mb-3 text-white font-semibold line-clamp-3">{topic.description}</p>
                            <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                key={index}
                                className={`w-6 h-6 ${index < (topic?.myRate ?? 0) ? 'fill-[#FFD700]' : 'fill-white'}`}
                                >
                                <use href={`/sprite.svg#starIcon`} />
                                </svg>
                            ))}
                            </div>
                        </div>
                    </Link>
                )
            )}

            {showUpdateUser && (
                <EditProfile handleShow={handleShow} />
            )}
        </div>
    );
};

export default UserPage;