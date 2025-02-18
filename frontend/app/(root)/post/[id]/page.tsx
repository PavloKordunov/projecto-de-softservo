"use client";

import { useParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';

interface Post {
      id: string;
      title: string;
      description: string;
      name: string;
      nickname: string;
      image?: string;
      isPinned: boolean;
      group_title: string;
      viewCount: string
  }

const PostPage = () => {

    const params = useParams();
    const postId = params.id;

    const [post, setPost] = useState<Post | null>(null)

    useEffect(() => {
        const getPostById = async() =>{
            try {
                const res = await fetch(`http://localhost:8080/api/posts/${postId}`)
                const data = await res.json()
                setPost(data.body)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        getPostById()
    },[])

    if (!post) {
        return <p className="text-white">Завантаження...</p>;
      }

    return (
        <div>
        <div className="p-7 mt-4 bg-MainColor rounded-[21px] mb-6 w-[1030px]">
            <div className="flex items-center justify-between mb-4">
            <Link href='/group/:id' className="flex item-center gap-2">
                    <Image src='/groupImage.png' alt="" width={38} height={38} />
                    <p className="text-[18px] text-white font-semibold">/{post?.group_title}</p>
                </Link>
                <div className="bg-SecondaryColor p-[2px] rounded-[20px] flex gap-2 items-center">
                    <Image src="/view.png" alt="" width={42} height={42}/>
                    <p className="text-[18px] text-[#C5D0E6]">{post.viewCount}</p>
                </div>
            </div>
            <p className="text-[24px] text-white font-bold mb-4">{post.title}</p>
            <p className="text-[18px] text-white mb-3">"{post.description}</p>
            <div className="flex gap-3 items-center mb-3">
                <div className="py-2 w-fit px-3 bg-SecondaryColor rounded-[24px]">
                    <p className="text-[13px] text-[#C5D0E6] font-semibold">фільм</p>
                </div>
                <div className="py-2 w-fit px-3 bg-SecondaryColor rounded-[24px]">
                    <p className="text-[13px] text-[#C5D0E6] font-semibold">хоррор</p>
                </div>
                <div className="py-2 w-fit px-3 bg-SecondaryColor rounded-[24px]">
                    <p className="text-[13px] text-[#C5D0E6] font-semibold">страшний</p>
                </div>
            </div>
            <Image src="/images.jpeg" alt="" width={980} height={760} className="mb-3" />
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Image src="/person.png" alt="" width={54} height={54}/>
                    <div>
                        <p className="text-[18px] text-white font-semibold">{post.nickname}</p>
                        <span className="text-[13px] text-[#C5D0E6] font-regular">2 години тому</span>
                    </div>
                    <div className="flex gap-3 ml-5">
                        <div className="flex items-center p-2 gap-3 bg-[#2C353D] rounded-[20px]">
                            <svg className="w-6 h-6" fill="#C5D0E6" >
                                <use href={`/sprite.svg#iconLike`} />
                            </svg>
                            <p className="text-[18px] text-[#C5D0E6]">120</p>
                            <Image src='/brokeHeart.png' alt="" width={29} height={29} />
                        </div>
                        <div className="flex items-center p-2 gap-3 bg-[#2C353D] rounded-[20px]">
                            <svg className="w-6 h-6" fill="#C5D0E6" >
                                <use href={`/sprite.svg#icon-comment`} />
                            </svg>
                            <p className="text-[18px] text-[#C5D0E6]">56</p>
                        </div>
                        <div className="flex items-center p-2 gap-3 bg-[#2C353D] rounded-[20px]">
                            <svg className="w-5 h-6" fill="#C5D0E6" >
                                <use href={`/sprite.svg#icon-save`} />
                            </svg>
                            <p className="text-[18px] text-[#C5D0E6]">10</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="p-4 mt-7 bg-MainColor rounded-[21px] mb-6 w-[1030px]">
            <input type="text" className=" w-[580px] h-14 py-2 text-white bg-MainColor border-none rounded-[10px] focus:outline-none" placeholder="Поширте те, що коїться у вас в голові..."/>
            <div className="flex items-center justify-between ">
                <Image src='/addPhoto.png' alt="" width={40} height={40} />
                <div className="flex gap-4">
                    <button className="px-3 py-2 bg-[#434C55] rounded-[17] text-white text-[16px] font-bold">Скасувати</button>
                    <button className="px-3 py-2 bg-AccnetColor rounded-[17] text-white text-[16px] font-bold">Коментувати</button>
                </div>
            </div>
        </div>
        <div className="py-5 px-7 mt-4 bg-MainColor rounded-[21px] mb-6 w-[1030px] flex items-center justify-between">
            <p className="text-[34px] text-white font-bold">Коментарі</p>
            <div className="flex items-center gap-4">
                <p className="text-[24px] text-white font-semibold">Сортувати:</p>
                <button className="px-3 py-2 bg-[#434C55] rounded-[17] flex gap-2 items-center">
                    <p className="text-[16px] text-white font-bold">За вподобаннями</p>
                    <svg className="w-4 h-4" >
                        <use href={`/sprite.svg#iconArrowDown`} />
                    </svg>
                </button>
            </div>
        </div>
        <div className="p-6 mt-7 bg-MainColor rounded-[21px] mb-6 w-[1030px]">
            <div className="flex items-center mb-6">
                <Image src="/person.png" alt="" width={40} height={40} className="mr-2" />
                <p className="text-[16px] text-white mr-4">Домінік Торрето</p>
                <p className="text-[16px] text-white">35хв. тому</p>
            </div>
            <p className="text-[28px] text-white font-bold mb-4">Це теж момент з того фільму?</p>
            <Image src="/images.jpeg" alt="" width={980} height={760} className="mb-3" />
            <div className="flex gap-3">
                <div className="flex items-center p-2 gap-3 bg-[#2C353D] rounded-[20px]">
                    <svg className="w-6 h-6" fill="#C5D0E6" >
                        <use href={`/sprite.svg#iconLike`} />
                    </svg>
                    <p className="text-[18px] text-[#C5D0E6]">120</p>
                    <Image src='/brokeHeart.png' alt="" width={29} height={29} />
                </div>
                <div className="flex items-center p-2 gap-3 bg-[#2C353D] rounded-[20px]">
                    <svg className="w-6 h-6" fill="#C5D0E6" >
                        <use href={`/sprite.svg#icon-comment`} />
                    </svg>
                    <p className="text-[18px] text-[#C5D0E6]">56</p>
                </div>
                <div className="flex items-center p-2 gap-3 bg-[#2C353D] rounded-[20px]">
                    <svg className="w-5 h-6" fill="#C5D0E6" >
                        <use href={`/sprite.svg#icon-save`} />
                    </svg>
                    <p className="text-[18px] text-[#C5D0E6]">10</p>
                </div>
            </div>
        </div>
        </div> 
     );
}
 
export default PostPage;