"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import GroupList from "./GroupList";
import { useUser } from "@/hooks/useUser";

const CreatePostModal = ({handleShow} : {handleShow : () => void}) => {

    const [fieldMode, setFieldMode] = useState("text")
    const [selectedGroup, setSelecterGroup] = useState<any>(null)
    const [showGroupList, setShowGroupList] = useState(false)
    const [base64, setBase64] = useState<string | null>(null);
    const {user} = useUser()
    const [post, setPost] = useState({
        title: "",
        user_id: user?.id,
        group_id:selectedGroup ? selectedGroup?.id : "" ,
        description: "",
        image: "",
    })

    const selectGroup = (group: any) => {
        setSelecterGroup(group);
        setPost((prev) => ({
            ...prev,
            group_id: group.id,
        }));
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreatePost = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.accessToken}`
                },
                body: JSON.stringify(post)
            })
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error)
        }
        handleShow()
    }

    function encodeImageFileAsURL(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onloadend = function () {
          const base64String = reader.result as string;
          setBase64(base64String);
          setPost((prev) => ({
            ...prev,
            image: base64String,
        }));
          console.log('RESULT:', base64String);
        };
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        console.log(post)
        console.log(selectedGroup)
    }, [post])

    return ( 
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-MainColor px-10 py-6 rounded-[31px] w-[710px]">
                <div className="flex items-center justify-between mb-5">
                    <p className="text-[44px] text-white font-semibold">Створити допис</p>
                    <svg className="w-8 h-8" fill="#fff" onClick={handleShow}>
                        <use href={`/sprite.svg#closeBtnIcon`} />
                    </svg>
                </div>
                <div onClick={()=> setShowGroupList(!showGroupList)} className="bg-SecondaryColor p-3 rounded-[31px] flex w-fit items-center gap-1 mb-6">
                    <Image src="/sabs.png" alt="" width={24} height={18} />
                    {selectedGroup ? <p className="text-[18px] text-white font-semibold">{selectedGroup?.title}</p> : <p className="text-[18px] text-white font-semibold">Обрати групу</p>}
                </div>
                <div className="flex items-center gap-6 mb-5">
                    <div className="bg-SecondaryColor px-4 py-2 rounded-[31px] w-fit ">
                        <p className="text-[18px] text-white font-semibold" onClick={() => setFieldMode("text")}>Текст</p>
                    </div>
                    <div className="bg-SecondaryColor px-4 py-2 rounded-[31px] w-fit">
                        <p className="text-[18px] text-white font-semibold" onClick={() => setFieldMode("media")}>Медіа</p>
                    </div>
                </div>
                <input type="text" name="title" value={post.title} onChange={handleInputChange} className="w-full h-12 px-4 py-2 text-white bg-SecondaryColor border-none rounded-[10px] mb-3 focus:outline-none" placeholder="Введіть заглоловок..."/>
                <div className="bg-SecondaryColor px-4 py-2 rounded-[31px] w-fit mb-3">
                    <p className="text-[14px] text-[#858EAD] font-semibold">додати тег</p>
                </div>
                {fieldMode === "text" ? (
                    <textarea name="description" value={post.description} onChange={handleInputChange} className="w-full h-64 px-4 py-2 resize-none text-white bg-SecondaryColor border-none rounded-[10px] mb-3 focus:outline-none" placeholder="Введіть опис..."></textarea>
                ): (
                    <div className="w-full h-64 px-4 py-2 flex items-center justify-center bg-SecondaryColor rounded-[10px] mb-5">
                        <label
                            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                            htmlFor="img"
                        >
                            <span>Завантажте світлину</span>
                        </label>
                        <input type="file" id="img" onChange={encodeImageFileAsURL} className="hidden"/>
                    </div>
                )}
                <div className="w-full flex justify-end">
                    <button onClick={handleCreatePost} className="px-4 py-2 bg-AccnetColor rounded-[10px] text-white text-[16px] h-[50px] font-medium">Створити пост</button>
                </div>
            </div>
            {showGroupList && <GroupList setShowGroupList={setShowGroupList} selectGroup={selectGroup} />}
        </div>
     );
}
 
export default CreatePostModal;