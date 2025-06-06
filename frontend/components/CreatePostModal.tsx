"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import GroupList from "./GroupList";
import { useUser } from "@/hooks/useUser";
import { useTheme } from "next-themes";

interface Group {
    id: string;
    title: string;
    description: string;
}

interface Tag {
    id: string;
    name: string;
}

const CreatePostModal = ({handleShow, group} : {handleShow : () => void, group?: Group }) => {

    const [fieldMode, setFieldMode] = useState("text")
    const [selectedGroup, setSelecterGroup] = useState<any>(null)
    const [showGroupList, setShowGroupList] = useState(false)
    const [base64, setBase64] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();
    const {user} = useUser()
    const [tagQuery, setTagQuery] = useState("");
    const [suggestedTags, setSuggestedTags] = useState<Tag[]>([]);
    const [post, setPost] = useState({
        title: "",
        userId: user?.id,
        groupId:selectedGroup ? selectedGroup?.id : group?.id,
        description: "",
        image: "",
        tagsId: [] as string[],
    })
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        if (tagQuery.trim() !== "") {
            fetch(`https://localhost:8080/api/tags/search?query=${tagQuery}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setSuggestedTags(data.body);
                    }
                })
                .catch(err => console.log(err));
        } else {
            setSuggestedTags([]);
        }
    }, [tagQuery]);

    const selectGroup = (selectGroup: any) => {
        setSelecterGroup(selectGroup);
        setPost((prev) => ({
            ...prev,
            groupId: selectGroup?.id,
        }));
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreatePost = async () => {
        try {
            const res = await fetch("https://localhost:8080/api/posts/create", {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.accessToken}`
                },
                body: JSON.stringify(post)
            })
            const data = await res.json();
            console.log(data);
            console.log("POST", post);
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

    const addTag = (tag: Tag) => {
        if (!post.tagsId.includes(tag.id)) {
            setPost((prev) => ({
                ...prev,
                tagsId: [...prev.tagsId, tag.id]
            }));
            setTags((prev) => [...prev, tag]);
        }
        setTagQuery("");
        setSuggestedTags([]);
    };


    useEffect(() => {
        console.log(post)
    }, [post])

    return ( 
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className={`${theme === 'dark' ? 'bg-MainColor' : 'bg-[#E4E3E3]'} px-10 py-6 rounded-[31px] w-[710px]`}>
                <div className="flex items-center justify-between mb-5">
                    <p className={`text-[36px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>Створити допис</p>
                    <svg className="w-8 h-8" fill="#fff" onClick={handleShow}>
                        <use href={`/sprite.svg#closeBtnIcon`} />
                    </svg>
                </div>
                <div onClick={()=> setShowGroupList(!showGroupList)} className={`${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} p-3 rounded-[31px] flex w-fit items-center gap-1 mb-6`}>
                    <Image src="/sabs.png" alt="" width={24} height={18} />
                    {selectedGroup || group ? <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>{selectedGroup ? `${selectedGroup?.title}` : `${group?.title}`}</p> : <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>Обрати групу</p>}
                </div>
                <div className="flex items-center gap-6 mb-5">
                    <div className={`${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} px-4 py-2 rounded-[31px] w-fit `}>
                        <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`} onClick={() => setFieldMode("text")}>Текст</p>
                    </div>
                    <div className={`${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} px-4 py-2 rounded-[31px] w-fit`}>
                        <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`} onClick={() => setFieldMode("media")}>Медіа</p>
                    </div>
                </div>
                <input type="text" name="title" value={post.title} onChange={handleInputChange} className={`w-full h-12 px-4 py-2  ${theme === 'dark' ? 'bg-SecondaryColor text-white' : 'bg-[#B5B5B5] text-black'} border-none rounded-[10px] mb-3 focus:outline-none`} placeholder="Введіть заглоловок..."/>
                <div className="relative flex items-center gap-4">
                    {tags.length > 0 &&<div className="flex flex-wrap gap-2 mb-3">
                        {tags.map(tag => (
                        <div key={tag.id} className={`${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} px-4 py-2 rounded-[31px] w-fit`}>
                            <p className="text-[14px] text-[#858EAD] font-semibold">{tag.name}</p>
                        </div>
                        ))}
                    </div>}
                    <div className="relative">
                        <div className={`${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} px-2 rounded-[31px] items-center justify-center w-fit mb-3`}>
                            <input type="text" value={tagQuery} onChange={(e) => setTagQuery(e.target.value)} className={`px-1 mt-3 text-[14px] font-semibold w-[88px] h-4 ${theme === 'dark' ? 'bg-SecondaryColor text-white' : 'bg-[#B5B5B5] text-black'} border-none rounded-[10px] mb-3 focus:outline-none`} placeholder="додати тег" />
                        </div>
                        {suggestedTags.length > 0 && (
                            <ul className="absolute w-[200px] p-4 bg-SecondaryColor rounded-[31px] shadow-md mt-1">
                                {suggestedTags.map(tag => (
                                    <li key={tag.id} className="px-2 py-1 cursor-pointer hover:bg-[#3A464F] transition-colors" onClick={() => addTag(tag)}>{tag.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                {fieldMode === "text" ? (
                    <textarea name="description" value={post.description} onChange={handleInputChange} className={`w-full h-64 px-4 py-2 resize-none ${theme === 'dark' ? 'bg-SecondaryColor text-white' : 'bg-[#B5B5B5] text-black'} border-none rounded-[10px] mb-3 focus:outline-none`} placeholder="Введіть опис..."></textarea>
                ): (
                    <div className={`w-full h-64 px-4 py-2 flex items-center justify-center ${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} rounded-[10px] mb-5`}>
                        
                        {base64 ? (
                                <div className="relative w-fit">
                                    <Image src={base64} alt="" width={2} height={2} className="w-fit max-h-64" />
                                    <svg onClick={() => setBase64('')} className="absolute top-[10px] right-[10px] w-7 h-8" fill="#FF4155">
                                        <use href={`/sprite.svg?v=1#bucket-icon`}></use>
                                    </svg>
                                </div>
                            ) : (
                                <>
                                    <label
                                        className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                                        htmlFor="img"
                                    >
                                        <span>Завантажте світлину</span>
                                    </label>
                        <           input type="file" id="img" onChange={encodeImageFileAsURL} className="hidden"/>
                                </>
                            )}
                    </div>
                )}
                <div className="w-full flex justify-end">
                    <button onClick={handleCreatePost} className="px-4 py-2 bg-AccnetColor rounded-[10px] text-white text-[16px] h-[50px] font-medium">Створити пост</button>
                </div>
            </div>
            {showGroupList && !group && <GroupList setShowGroupList={setShowGroupList} selectGroup={selectGroup} />}
        </div>
     );
}
 
export default CreatePostModal;