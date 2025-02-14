"use client"

import Image from "next/image";
import React, { useState } from "react";

const CreatePostModal = ({handleShow} : {handleShow : () => void}) => {

    const [fieldMode, setFieldMode] = useState("text")

    return ( 
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-MainColor px-10 py-6 rounded-[31px] w-[710px]">
                <div className="flex items-center justify-between mb-5">
                    <p className="text-[44px] text-white font-semibold">Створити допис</p>
                    <svg className="w-8 h-8" fill="#fff" onClick={handleShow}>
                        <use href={`/sprite.svg#closeBtnIcon`} />
                    </svg>
                </div>
                <div className="bg-SecondaryColor p-3 rounded-[31px] flex w-fit items-center gap-1 mb-6">
                    <Image src="/sabs.png" alt="" width={24} height={18} />
                    <p className="text-[18px] text-white font-semibold">Обрати групу</p>
                </div>
                <div className="flex items-center gap-6 mb-5">
                    <div className="bg-SecondaryColor px-4 py-2 rounded-[31px] w-fit ">
                        <p className="text-[18px] text-white font-semibold" onClick={() => setFieldMode("text")}>Текст</p>
                    </div>
                    <div className="bg-SecondaryColor px-4 py-2 rounded-[31px] w-fit">
                        <p className="text-[18px] text-white font-semibold" onClick={() => setFieldMode("media")}>Медіа</p>
                    </div>
                </div>
                <input type="text" className="w-full h-12 px-4 py-2 text-white bg-SecondaryColor border-none rounded-[10px] mb-3 focus:outline-none" placeholder="Введіть заглоловок..."/>
                <div className="bg-SecondaryColor px-4 py-2 rounded-[31px] w-fit mb-3">
                    <p className="text-[14px] text-[#858EAD] font-semibold">додати тег</p>
                </div>
                {fieldMode === "text" ? (
                    <textarea className="w-full h-64 px-4 py-2 resize-none text-white bg-SecondaryColor border-none rounded-[10px] mb-3 focus:outline-none" placeholder="Введіть опис..."></textarea>
                ): (
                    <div className="w-full h-64 px-4 py-2 flex items-center justify-center bg-SecondaryColor rounded-[10px] mb-5">
                        <label
                            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                            htmlFor="img"
                        >
                            <span>Upload a photo</span>
                        </label>
                        <input type="file" id="img" className="hidden" />
                    </div>
                )}
                <div className="w-full flex justify-end">
                    <button className="px-4 py-2 bg-AccnetColor rounded-[10] text-white text-[16px] h-[50px] font-medium">Створити пост</button>
                </div>
            </div>
        </div>
     );
}
 
export default CreatePostModal;