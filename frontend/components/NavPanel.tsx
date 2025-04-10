'use client'

import Image from "next/image";
import Link from "next/link";
import CreateGroup from "./CreateGroup";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useOktaAuth } from "@okta/okta-react";
import useLastGroups from "@/hooks/useLastGroups";
import { set } from "date-fns";

const NavPanel = () => {
    const { theme, setTheme } = useTheme();
    const [showGroup, setShowGroup] = useState(false);
    const { authState } = useOktaAuth();
    const router = useRouter();
    const [popularTags, setPopularTags] = useState<any[]>([]);

    const handleShowCreateGroup = () => {
        if (!authState?.isAuthenticated) {
            router.push("/login");
            return;
        }
        setShowGroup(!showGroup)
    }

    const lastGroups = useLastGroups()

    const getRandomPost = async () => {
        try {
            const res = await fetch('https://localhost:8080/api/posts/random')
            const data = await res.json()

            router.push(`/post/${data.body.id}`)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        const populatTags = async () => {
            try {
                const res = await fetch('https://localhost:8080/api/tags/popular',{
                    mode: "cors"
                })
                const data = await res.json()
                if (data.success) {
                    setPopularTags(data.body)
                }
            } catch (error) {
                console.log(error)
            }
        }
        populatTags()
    }, [])

    return (
        <div className="flex flex-col">
            <div className={`mt-4 xl:ml-16 p-3 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} cursor-pointer rounded-[21px] w-fit flex flex-row xl:flex-col gap-3 mb-[10px] md:mb-6`}>
                <Link href="/topics" className={`p-2 hover:bg-AccnetColor ${theme === 'dark' ? 'bg-[#262D34]' : 'bg-[#FFFFFF]'} flex gap-2 items-center rounded-[10px] h-[60px] w-90 lg:w-90`}>
                    <div className="w-9 h-9  rounded-[20px] flex items-center justify-center">
                        <svg className="w-6 h-6">
                            <use href={`/sprite.svg#icon1`} />
                        </svg>
                    </div>
                    <div>
                        <p style={{ color: theme === 'dark' ? '#97989D' : 'black' }} className="text-[12px] lg:text-[16px] font-semibold">КіноКнигаСеріал</p>
                        <p className="text-[#97989D] hover:text-black text-[8px] lg:text-[12px]">Обирай фільми, книги та серіали.</p>
                    </div>
                </Link>
                <div onClick={getRandomPost} className={`p-2 ${theme === 'dark' ? 'bg-[#262D34]' : 'bg-[#FFFFFF]'} hover:bg-AccnetColor flex gap-2 items-center rounded-[10px] h-[60px] w-90 lg:w-90`}>
                    <div className="w-9 h-9  rounded-[20px] flex items-center justify-center">
                        <svg className="w-6 h-6">
                            <use href={`/sprite.svg#diceIcon`} />
                        </svg>
                    </div>
                    <div>
                        <p style={{ color: theme === 'dark' ? '#97989D' : 'black' }} className="text-[12px] lg:text-[16px] font-semibold">Випадковий допис</p>
                        <p className="text-[#97989D] hover:text-black text-[8px] lg:text-[12px]">Tap and try your luck</p>
                    </div>
                </div>
                <div className={`p-2 ${theme === 'dark' ? 'bg-[#262D34]' : 'bg-[#FFFFFF]'} hover:bg-AccnetColor flex gap-2 items-center rounded-[10px] h-[60px] w-90 lg:w-90`}>
                    <div className="w-9 h-9  rounded-[20px] flex items-center justify-center">
                        <svg className="w-6 h-6 ">
                            <use href={`/sprite.svg#icon2`} />
                        </svg>
                    </div>
                    <div>
                        <p style={{ color: theme === 'dark' ? '#97989D' : 'black' }} className="text-[12px] lg:text-[16px] font-semibold">Підписки</p>
                        <p className="text-[#97989D] text-[8px] hover:text-black lg:text-[12px]">Explore from your favorite person</p>
                    </div>
                </div>
            </div>
            <div>
                <div className={`hidden xl:ml-16 xl:w-[272px] xl:p-6 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} xl:rounded-[21px] xl:flex xl:flex-col xl:gap-3 xl:mb-6`}>
                    <div className="flex items-center gap-2">
                        <motion.div
                            className="flex items-center gap-2 mb-[10px]"
                            initial={{x: -100, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{duration: 0.5, ease: 'easeOut'}}
                        >
                            <motion.p
                                className={`text-[21px] text-${theme === 'dark' ? '#97989D' : 'black'} font-semibold`}
                                initial={{x: -100, opacity: 0}}
                                animate={{x: 0, opacity: 1}}
                                transition={{duration: 0.5, ease: 'easeOut'}}
                                whileHover={{scale: 1.1, color: '#FF4155'}}
                            >
                                Останні групи
                            </motion.p>
                        </motion.div>
                    </div>
                    <button
                        className="border-none bg-AccnetColor w-full h-[40px] rounded-[8px] text-[18px] text-white font-semibold mb-3"
                        onClick={handleShowCreateGroup}>Створити групу
                    </button>
                    {lastGroups.map((group) => (
                    <Link
                        href={`/group/${group.id}`}
                        key={group.id} 
                        className={`flex gap-2 ${theme === 'dark' ? 'bg-[#262D34]' : 'bg-[#FFFFFF]'} hover:bg-AccnetColor p-[10px] rounded-[10px] items-center`}
                    >
                        <div className="w-[42px] h-[42px] overflow-hidden rounded-[8px]"> 
                        {group.image ? (
                            <Image 
                            src={group.image} 
                            alt={group.title} 
                            width={42} 
                            height={42}
                            className="w-full h-full object-cover" 
                            />
                        ) : (
                            <Image 
                            src="/groupImage.png"
                            alt="Default group image" 
                            width={42} 
                            height={42}
                            className="w-full h-full object-cover"
                            />
                        )}
                        </div>
                        <div className="flex flex-col cursor-pointer">
                        <p className={`${theme === 'dark' ? 'text-[#97989D]' : 'text-black'} text-[16px] font-semibold`}>
                            {group.title}
                        </p>
                        <p className="text-[#97989D] hover:text-black text-[12px]">
                            {group.postCount} постів у групі
                        </p>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
            <div>
                <div className={`hidden xl:ml-16 xl:w-[272px] xl:p-6 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} rounded-[21px] xl:flex xl:flex-col xl:gap-3 xl:mb-6`}>
                    <div className="flex items-center gap-[15px]">
                        <motion.div
                            className="flex items-center gap-2 mb-[10px]"
                            initial={{x: -100, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{duration: 0.5, ease: 'easeOut'}}
                        >
                            <motion.p
                                className={`text-[21px] text-${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}
                                initial={{x: -100, opacity: 0}}
                                animate={{x: 0, opacity: 1}}
                                transition={{duration: 0.5, ease: 'easeOut'}}
                                whileHover={{scale: 1.1, color: '#FF4155'}}
                            >
                                Популярні Теги
                            </motion.p>
                        </motion.div>
                    </div>
                    {popularTags.map((tag, i) => (
                    (i < 3) && <Link href={`/tag/${tag.id}`} key={tag.id} className={`flex gap-[15px] ${theme === 'dark' ? 'bg-[#262D34]' : 'bg-[#FFFFFF]'} cursor-pointer hover:bg-AccnetColor p-[10px] rounded-[10px] items-center`}>
                        <Image src="/tagIcon.png" alt="" width={42} height={42}/>
                        <div className="flex flex-col">
                            <p className="text-${theme === 'dark' ? '#97989D' : 'black'} text-[16px] font-semibold">#{tag.name}</p>
                            <p className="text-[#97989D] hover:text-black text-[12px]">{tag.countPosts} Posted by this tag</p>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
            {showGroup && <CreateGroup handleShow={handleShowCreateGroup}/>}
        </div>
    );
}

export default NavPanel;
