"use client"

import Post from "@/components/Post";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Group {
    id: string;
    title: string;
    description: string;
}

const Group = () => {

    const [posts, setPosts] = useState<any[]>([]);
    const params = useParams();
    const groupId = params.id;
    const [group, setGroup] = useState<Group | null>(null)

    useEffect(() => {
        const getAllPost = async () => {
          const res = await fetch(`http://localhost:8080/api/posts/group/${groupId}`);
          const data = await res.json();
          setPosts(data.body);
          console.log(data);
        };
        const getPostById = async() =>{
            try {
                const res = await fetch(`http://localhost:8080/api/groups/${groupId}`)
                const data = await res.json()
                setGroup(data.body)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        getPostById()
        getAllPost();
      }, []);

    if (!group) {
        return <p className="text-white">Group not found</p>;
    }

    return (
        <div> 
            <div className="mt-4 px-5 py-4 bg-MainColor rounded-[21px] flex items-center justify-between h-fit w-[1030px]">
                <div className="flex items-center gap-3">
                    <Image src="/groupImage.png" alt="" width={60} height={60} />
                    <div>
                        <p className="text-white text-[28px] font-semibold">{group?.title}</p>
                        <p className="text-[#97989D] text-[20px]">82,645 Постів у цій групі</p>
                    </div>
                </div>
                <div className="flex gap-7">
                    <button className="px-4 py-2 bg-AccnetColor rounded-[10px] text-white text-[16px] h-[50px] font-medium">Створити пост</button>
                    <button className="px-4 py-2 bg-[#3A7F4F] rounded-[10px] text-white text-[16px] h-[50px] font-medium">Приєднатися</button>
                </div>
            </div>
            <div className="flex gap-6">
                <div className="mt-4 px-5 py-4 bg-MainColor rounded-[21px] h-fit w-[710px]">
                    <p className="text-white text-[15px] font-semibold mb-3 line-clamp-2"><strong>Опис:</strong> {group?.description} </p>
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
                </div>
                <div className="mt-4  px-2 py-4 bg-MainColor rounded-[21px] h-fit w-[295px]">
                    <div className="flex items-center gap-2 mb-2">
                        <Image src="/sabs.png" alt="" width={24} height={18} />
                        <p className="text-white text-[15px] font-semibold">317,731  підписники</p>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <Image src="/subsActive.png" alt="" width={24} height={18} />
                        <p className="text-white text-[15px] font-semibold">37,731  онлайн</p>
                    </div>
                    <div className="flex items-center">
                        <div className="py-2 w-fit px-3 bg-SecondaryColor rounded-[24px]">
                            <p className="text-[13px] text-[#C5D0E6] font-semibold">Публічна група</p>
                        </div>
                        <p className="text-white text-[15px] font-semibold">Створена: 31.12.2024</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 p-5 bg-MainColor rounded-[21px] h-fit w-[1030px] mb-8">
                <div className="flex items-center gap-1 mb-6">
                    <svg width={30} height={32}>
                        <use href={`/sprite.svg#pinIcon`} />
                    </svg>
                    <p className="text-white text-[28px] font-bold">Закріплені пости</p>
                </div>
                <div className="flex gap-6">
                    <div className="bg-SecondaryColor w-[311px] h-[263px] rounded-br-[14px] rounded-bl-[14px]">
                        <Image src="/ImgPost1.png" alt="" width={311} height={204} className="mb-2" />
                        <p className=" ml-3 text-white text-[16px] font-bold">Найкращий фільм 2024 року, чи черговий хайп? </p>
                    </div>
                    <div className="bg-SecondaryColor w-[311px] h-[263px] rounded-br-[14px] rounded-bl-[14px]">
                        <Image src="/ImgPost2.png" alt="" width={311} height={204} className="mb-2" />
                        <p className=" ml-3 text-white text-[16px] font-bold">А взагалі є сенс це дивитися? Це ж вже було... </p>
                    </div>
                    <div className="bg-SecondaryColor w-[311px] h-[263px] rounded-br-[14px] rounded-bl-[14px]">
                        <Image src="/imgPost3.png" alt="" width={311} height={204} className="mb-2" />
                        <p className=" ml-3 text-white text-[16px] font-bold">Захар Беркут чи Беркут Захар? Ось в чому питання... </p>
                    </div>
                </div>
            </div>
            {posts.length > 0 ? (
                posts.map((post) => <Post key={post.id} post={post} />)
            ) : (
                <p>Поки що немає постів...</p>
            )}
        </div>
     );
}
 
export default Group;