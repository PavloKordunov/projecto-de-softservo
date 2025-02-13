"use client"

import Image from "next/image";
import { useState } from "react";

const NavBar = () => {

    const [show, setShow] = useState(false)
    const [showNitification, setShowNitification] =useState(false)

    const handleShow = () => {
        setShow(!show)
    }

    return ( 
        <div className="w-full py-4 px-10 bg-MainColor flex items-center flex-1 justify-between">
            <div>
                <p className="text-AccnetColor font-bold text-[30px]">Logo</p>
            </div>
            <div className=" flex gap-6 items-center relative">
                <div className="  hidden xl:bg-SecondaryColor xl:w-14 xl:h-14 xl:rounded-[9px] xl:flex items-center justify-center">
                    <svg className="w-6 h-6" >
                        <use href={`/sprite.svg#iconHome`} />
                    </svg>
                </div>
                <div className="hidden xl:bg-SecondaryColor xl:w-14 xl:h-14 xl:rounded-[9px] xl:flex items-center justify-center">
                    <svg className="w-6 h-6" >
                        <use href={`/sprite.svg#CalendarIcon`} />
                    </svg>
                </div>
                <div className="hidden xl:bg-SecondaryColor xl:w-14 xl:h-14 xl:rounded-[9px] xl:flex items-center justify-center">
                    <svg className="w-6 h-6" >
                        <use href={`/sprite.svg#iconCommunity`} />
                    </svg>
                </div>
                <input type="text" className=" md:w-[300px] lg:w-[480px] 2xl:w-[580px] h-14 px-4 py-2 text-white bg-SecondaryColor border-none rounded-[10px] focus:outline-none" placeholder="Введіть для пошуку..."/>
                <svg className="w-6 h-6 absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2" >
                    <use href={`/sprite.svg#iconSearch`} />
                </svg>
            </div>
            <div className="flex gap-6 items-center">
            <div className="bg-SecondaryColor w-14 h-14 rounded-[9px] flex items-center justify-center">
                    <svg className="w-6 h-6" >
                        <use href={`/sprite.svg#iconMessage`} />
                    </svg>
                </div>
                <div className="bg-SecondaryColor w-14 h-14 rounded-[9px] flex items-center justify-center" onClick={() =>setShowNitification(!showNitification)}>
                    <svg className="w-6 h-6" >
                        <use href={`/sprite.svg#iconNotification`} />
                    </svg>
                </div>
                <div className="flex gap-4 items-center" onClick={handleShow}>
                    <div className="bg-[#F9DFC0] w-14 h-14 rounded-[9px] flex items-center justify-center">
                        <Image src="/NavPerson.png" alt="person" width={45} height={40} />
                    </div>
                    <span className="text-white text-[21px] font-bold">User</span>
                    <svg className="w-4 h-3" >
                        <use href={`/sprite.svg#iconArrowDown`} />
                    </svg>
                </div>
            </div>
            {show && (
                <div className="absolute w-[248px] bg-MainColor p-3 top-[100px] right-[37px] flex flex-col justify-center gap-4 rounded-[11px]">
                    <div className="flex items-center gap-4">
                        <Image src="/person.png" alt="" width={53} height={53} />
                        <div>
                            <p className="text-white text-[16px] font-semibold">View Profile</p>
                            <p className="text-[#97989D] text-[12px]">@Nickname</p>
                        </div>
                    </div>
                    <div className="ml-2 flex items-center gap-4">
                        <svg className="w-8 h-8" fill="#fff" >
                            <use href={`/sprite.svg#NavThemeIcon`} />
                        </svg>
                        <p className="text-white text-[14px] font-semibold">Dark Mode</p>
                        <div className="bg-SecondaryColor w-[58px] h-[31px] rounded-[35px] px-[4px] py-[3px] flex justify-end">
                            <div className="bg-white w-[25px] h-[25px] rounded-full">

                            </div>
                        </div>
                    </div>
                    <div className="ml-2 flex items-center gap-4">
                        <svg className="w-8 h-8" fill="#fff" >
                            <use href={`/sprite.svg#NavSettingsIcon`} />
                        </svg>
                        <p className="text-white text-[14px] font-semibold">Settings</p>
                    </div>
                    <div className="ml-2 flex items-center gap-4">
                        <svg className="w-8 h-8" fill="#fff" >
                            <use href={`/sprite.svg#iconCrown`} />
                        </svg>
                        <p className="text-white text-[14px] font-semibold">Admin Page</p>
                    </div>
                    <div className="ml-2 flex items-center gap-4">
                        <svg className="w-8 h-8" fill="#fff" >
                            <use href={`/sprite.svg#NavExitIcon`} />
                        </svg>
                        <p className="text-white text-[14px] font-semibold">Log out</p>
                    </div>
                </div>
            )}
            {showNitification && (
                <div className="absolute w-[360px] bg-[#2C353D] px-5 py-4 top-[100px] right-[37px] flex flex-col justify-center rounded-[11px]">
                    <div className="bg-MainColor px-4 py-3 rounded-[10px] flex items-center gap-3 mb-2">
                        <Image src="/person.png" alt="" width={35} height={35} className="w-[35px] h-[35px]" />
                        <p className="text-white text-[14px] font-semibold">Користувач Арнольд Шварценігер підписався на вас</p>
                    </div>
                    <div className="bg-MainColor px-4 py-3 rounded-[10px] flex items-center gap-3 mb-2">
                        <Image src="/person.png" alt="" width={35} height={35} className="w-[35px] h-[35px]" />
                        <p className="text-white text-[14px] font-semibold">Користувач Арнольд Шварценігер вподобав ваш пост</p>
                    </div>
                    <div className="bg-MainColor px-4 py-3 rounded-[10px] flex items-center gap-3 mb-2">
                        <Image src="/person.png" alt="" width={35} height={35} className="w-[35px] h-[35px]" />
                        <p className="text-white text-[14px] font-semibold">Користувач Арнольд Шварценігер відповів на ваш пост</p>
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default NavBar;