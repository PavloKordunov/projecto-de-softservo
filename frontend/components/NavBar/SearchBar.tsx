import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import {  useEffect, useRef, useState } from "react";

const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [showSearchInfo, setShowSearchInfo] = useState(false);
    const [searchInfo, setSearchInfo] = useState('');
    const controls = useAnimation();
    const searchBarRef = useRef<HTMLDivElement>(null);
    const [searchType, setSearchType] = useState('all');
    const [posts, setPosts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [topics, setTopics] = useState([]);
    const [users, setUsers] = useState([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInfo(value);
        setShowSearchInfo(true);
        if (value.trim() === '') {
            setShowSearchInfo(false);
        } else {
            setShowSearchInfo(true);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        controls.start({ x: -10, opacity: 1, scale: 1.2 });
    };

    const handleBlur = () => {
        setIsFocused(false);
        controls.start({ x: 0, opacity: 0.7, scale: 1 });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setShowSearchInfo(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://localhost:8080/api/search/${searchInfo}`, {
                    mode: "cors",
                });
                const data = await res.json();
                setPosts(data.body.posts);
                setGroups(data.body.groups);
                setTopics(data.body.topics);
                setUsers(data.body.users);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (searchInfo) {
            fetchData();
        }
    }, [searchInfo]);

    useEffect(() => {
        console.log("Posts: ", posts, "Groups: ", groups, "Topics: ", topics, "Users: ", users);
    }, [posts, groups, topics, users]);

    return (
        <div ref={searchBarRef} className="relative w-[340px] md:w-[300px] lg:w-[480px] 2xl:w-[580px]">

            {searchInfo.length > 0 && showSearchInfo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10 pointer-events-none"></div>
            )}

            <motion.input
                type="text"
                onChange={handleChange}
                value={searchInfo}
                className="relative z-20 w-full h-14 px-4 cursor-pointer py-2 text-white bg-SecondaryColor border-b-[3px] border-SecondaryColor rounded-[10px] focus:outline-none transition-all duration-300"
                placeholder="Введіть для пошуку..."
                onFocus={handleFocus}
                onBlur={handleBlur}
                animate={{
                    width: isFocused ? "100%" : "80%",
                    backgroundColor: isFocused ? "#2C353D" : "#1E1F20",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {showSearchInfo && (
                <div className="absolute w-[750px] z-20 bg-MainColor px-6 py-2 top-[80px] right-[50%] translate-x-1/2 flex flex-col gap-3 rounded-[11px]">
                    <div className="flex items-center justify-between gap-2 p-2">
                        <div className={`flex items-center ${searchType === "all" ? "bg-SecondaryColor" : ""} rounded-[10px] py-4 px-7`} onClick={() => setSearchType('all')}>
                            <p className="text-white font-semibold text-[14px]" >Все</p>
                        </div>
                        <div className={`flex items-center ${searchType === "posts" ? "bg-SecondaryColor" : ""} rounded-[10px] py-4 px-7`} onClick={() => setSearchType('posts')}>
                            <p className="text-white font-semibold text-[14px]" >Дописи</p>
                        </div>
                        <div className={`flex items-center ${searchType === "groups" ? "bg-SecondaryColor" : ""} rounded-[10px] py-4 px-7`} onClick={() => setSearchType('groups')}>
                            <p className="text-white font-semibold text-[14px]" >Групи</p>
                        </div>
                        <div className={`flex items-center ${searchType === "topics" ? "bg-SecondaryColor" : ""} rounded-[10px] py-4 px-7`} onClick={() => setSearchType('topics')}>
                            <p className="text-white font-semibold text-[14px]" >Теми</p>
                        </div>
                        <div className={`flex items-center ${searchType === "users" ? "bg-SecondaryColor" : ""} rounded-[10px] py-4 px-7`} onClick={() => setSearchType('users')}>
                            <p className="text-white font-semibold text-[14px]" >Користувачі</p>
                        </div>
                    </div>
                    {(searchType === 'posts' || searchType === 'all') && (
                        <div className="flex flex-col gap-3">
                            {searchType === 'all' && posts.length > 0 && (
                                <p className="text-[16px] text-white font-semibold">Дописи: </p>
                            )}
                            {posts.map((post: any) => (
                                <div key={post.id} className="flex items-center p-2 rounded-[10px] bg-SecondaryColor w-fit">
                                    <div className="flex items-center gap-2">
                                        <Image src={post.image} alt="" width={100} height={120} />
                                        <div>
                                            <p className="text-[12px] text-white font-semibold">/{post.groupTitle}</p>
                                            <p className="text-[14px] mb-2 text-white font-semibold">{post.title}</p>
                                            <div className="flex items-center gap-2">
                                                <Image src="/person.png" alt="" width={24} height={24} />
                                                <p className="text-[12px] text-white font-semibold">{post.nickname}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {(searchType === 'groups' || searchType === 'all') && (
                        <div className="flex flex-col gap-3">
                            {searchType === 'all' && groups.length > 0 && (
                                <p className="text-[16px] text-white font-semibold">Групи: </p>
                            )}
                            {groups.map((group: any) => (
                                <div key={group.id} className="flex items-center p-2 rounded-[10px] bg-SecondaryColor w-fit">
                                    <div className="flex items-center gap-2">
                                        <Image src="/groupImage.png" alt="" width={40} height={40} />
                                        <div>
                                            <p className="text-[12px] text-white font-semibold">/{group.title}</p>
                                            <p className="text-[#97989D] text-[10px]">82,645 Постів у цій групі</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {(searchType === 'topics' || searchType === 'all') && (
                        <div className="flex flex-col gap-3">
                            {searchType === 'all' && topics.length > 0 && (
                                <p className="text-[16px] text-white font-semibold">Теми: </p>
                            )}
                            {topics.map((topic: any) => (
                                <div key={topic.id} className="flex items-center p-2 rounded-[10px] bg-SecondaryColor w-fit">
                                    <div className="flex items-center gap-2">
                                        <Image src={topic.image} alt="" width={100} height={120} />
                                        <div>
                                            <p className="text-[14px] text-white font-semibold">/{topic.title}</p>
                                            <p className="text-[12px] mb-2 text-white font-semibold line-clamp-3">{topic.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {(searchType === 'users' || searchType === 'all') && (
                        <div className="flex flex-col gap-3">
                           {searchType === 'all' && users.length > 0 && (
                                <p className="text-[16px] text-white font-semibold">Користувачі: </p>
                            )}
                            {users.map((user: any) => (
                                <div key={user.id} className="flex items-center p-2 rounded-[10px] bg-SecondaryColor w-fit">
                                    <div className="flex items-center gap-2">
                                        <Image src="/person.png" alt="" width={40} height={40} />
                                        <div>
                                            <p className="text-[12px] text-white font-semibold">{user.firstName}</p>
                                            <p className="text-[#97989D] text-[10px]">{user.nickName}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/*<motion.svg*/}
            {/*    className={`w-6 h-6 absolute cursor-text top-[30px] right-[455px] z-10 transform -translate-y-1/2 text-white ${isFocused ? 'opacity-100' : 'hidden'}`}*/}
            {/*    initial={{ x: 0, opacity: 0.7, scale: 1 }}*/}
            {/*    animate={controls}*/}
            {/*    transition={{ type: "spring", stiffness: 150 }}*/}
            {/*>*/}
            {/*    <use href="/sprite.svg#iconSearch" />*/}
            {/*</motion.svg>*/}
        </div>
    );
};

export default SearchBar;
