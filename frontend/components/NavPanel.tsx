"use client"

import Image from "next/image";
import Link from "next/link";
import CreateGroup from "./CreateGroup";
import { useState } from "react";

const NavPanel = () => {

    const [showGroup, setShowGroup] = useState(false)

    const handleShowCreateGroup = () => {
        setShowGroup(!showGroup)
    }

    return ( 
        <div className="flex flex-col">
        <div className="mt-4  xl:ml-16 p-3 bg-MainColor rounded-[21px] w-fit flex flex-row xl:flex-col gap-3 mb-6">
            <Link href="/topics" className="p-2 bg-[#262D34] flex gap-2 items-center rounded-lg h-[60px] w-90 lg:w-90">
                <div className="w-9 h-9 bg-SecondaryColor rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" >
                        <use href={`/sprite.svg#icon1`} />
                    </svg>
                </div>
                <div>
                    <p className="text-white text-[12px] lg:text-[16px] font-semibold">КіноКнигаСеріал</p>
                    <p className="text-[#97989D] text-[8px] lg:text-[12px]">Обирай фільми, книги та серіали.</p>
                </div>
            </Link>
            <div className="p-2 bg-[#262D34] flex gap-2 items-center rounded-lg h-[60px] w-90 lg:w-90">
                <div className="w-9 h-9 bg-SecondaryColor rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" >
                        <use href={`/sprite.svg#diceIcon`} />
                    </svg>
                </div>
                <div>
                    <p className="text-white text-[12px] lg:text-[16px] font-semibold">Випадковий допис</p>
                    <p className="text-[#97989D] text-[8px] lg:text-[12px]">Tap and try your luck</p>
                </div>
            </div>
            <div className="p-2 bg-[#262D34] flex gap-2 items-center rounded-lg h-[60px] w-90 lg:w-90">
                <div className="w-9 h-9 bg-SecondaryColor rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" >
                        <use href={`/sprite.svg#icon2`} />
                    </svg>
                </div>
                <div>
                    <p className="text-white text-[12px] lg:text-[16px] font-semibold">Підписки</p>
                    <p className="text-[#97989D] text-[8px] lg:text-[12px]">Explore from your favorite person</p>
                </div>
            </div>
        </div>
        <div>
            <div className="hidden xl:ml-16 xl:w-[272px] xl:p-6 xl:bg-MainColor xl:rounded-[21px]  xl:flex xl:flex-col xl:gap-3 xl:mb-6">
                <div className="flex items-center gap-2">
                    <p className="text-[21px] text-white font-semibold">Групи</p>
                    <svg className="w-4 h-3" fill="#fff" >
                        <use href={`/sprite.svg#exit-arrow`} />
                    </svg>
                </div>
                <button className="border-none bg-AccnetColor w-full h-[40px] rounded-[8px] text-[18px] text-white font-semibold mb-3" onClick={handleShowCreateGroup}>Створити групу</button>
                <div className="flex gap-2 items-center">
                    <Image src="/groupIcon.png" alt="" width={42} height={42}/>
                    <div className="flex flex-col">
                        <p className="text-white text-[16px] font-semibold">ФільмиУкраїнською</p>
                        <p className="text-[#97989D] text-[12px]">82,645 Posted by this tag</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="hidden xl:ml-16 xl:w-[272px] xl:p-6 xl:bg-MainColor xl:rounded-[21px] xl:flex xl:flex-col xl:gap-3 xl:mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <p className="text-[21px] text-white font-semibold">Популярні Теги</p>
                </div>
                <div className="flex gap-2 items-center">
                    <Image src="/tagIcon.png" alt="" width={42} height={42}/>
                    <div className="flex flex-col">
                        <p className="text-white text-[16px] font-semibold">#Жахи</p>
                        <p className="text-[#97989D] text-[12px]">82,645 Posted by this tag</p>
                    </div>
                </div>
            </div>
        </div>
        {showGroup && <CreateGroup handleShow={handleShowCreateGroup}/>}
        </div>
     );
}
 
export default NavPanel;