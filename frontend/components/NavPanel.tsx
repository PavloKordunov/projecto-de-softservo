'use client'

import Image from "next/image";
import Link from "next/link";
import CreateGroup from "./CreateGroup";
import { useState } from "react";
import { motion } from 'framer-motion';
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const NavPanel = () => {
    const { theme, setTheme } = useTheme();
    const [showGroup, setShowGroup] = useState(false)

    const handleShowCreateGroup = () => {
        setShowGroup(!showGroup)
    }

    const router = useRouter();

    const getRandomPost = async () => {
        try {
            const res = await fetch('https://localhost:8080/api/posts/random')
            const data = await res.json()

            router.push(`/post/${data.body.id}`)
        } catch (error) {
            console.log(error)
        }
    }

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
                                Закріплені групи
                            </motion.p>
                        </motion.div>
                        <svg className="w-4 h-3">
                            <use href={`/sprite.svg#exit-arrow`}/>
                        </svg>
                    </div>
                    <button
                        className="border-none bg-AccnetColor w-full h-[40px] rounded-[8px] text-[18px] text-white font-semibold mb-3"
                        onClick={handleShowCreateGroup}>Створити групу
                    </button>
                    <div className={`flex gap-2 ${theme === 'dark' ? 'bg-[#262D34]' : 'bg-[#FFFFFF]'} hover:bg-AccnetColor p-[10px] rounded-[10px] items-center`}>
                        <Image src="/groupIcon.png" alt="" width={42} height={42}/>
                        <div className="flex flex-col cursor-pointer">
                            <p className="text-${theme === 'dark' ? '#97989D' : 'black'} text-[16px] font-semibold">ФільмиУкраїнською</p>
                            <p className="text-[#97989D] hover:text-black text-[12px]">82,645 Posted by this tag</p>
                        </div>
                    </div>
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
                    <div className={`flex gap-[15px] ${theme === 'dark' ? 'bg-[#262D34]' : 'bg-[#FFFFFF]'} cursor-pointer hover:bg-AccnetColor p-[10px] rounded-[10px] items-center`}>
                        <Image src="/tagIcon.png" alt="" width={42} height={42}/>
                        <div className="flex flex-col">
                            <p className="text-${theme === 'dark' ? '#97989D' : 'black'} text-[16px] font-semibold">#Жахи</p>
                            <p className="text-[#97989D] hover:text-black text-[12px]">82,645 Posted by this tag</p>
                        </div>
                    </div>
                </div>
            </div>
            {showGroup && <CreateGroup handleShow={handleShowCreateGroup}/>}
        </div>
    );
}

export default NavPanel;
