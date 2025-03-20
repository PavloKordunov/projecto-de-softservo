"use client"

import { useUser } from "@/hooks/useUser";
import { group } from "console";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const GroupPage = () => {

    const [groups, setGroups] = useState<any[]>([]);
    const [userSubscribed, setUserSubscribed] = useState<any[]>([]);
    const {user} = useUser()

    useEffect(() => {
        const getAllGroups = async () => {
          const res = await fetch("http://localhost:8080/api/groups");
          const data = await res.json();
          setGroups(data.body);
          console.log(data);
        };
        const getFollowedGroups = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/groups/followed/${user?.id}`)
                const data = await res.json()
                setUserSubscribed(data.body)
            } catch (error) {
                console.log(error)
            }
        } 

        getFollowedGroups()
        getAllGroups();
      }, []);  
      
      const subscribeUser = async (title: string) => {
        const res = await fetch(`http://localhost:8080/api/groups/${title}/follow/${user?.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user?.accessToken}`
            }
        }
        );
        const data = await res.json();
        console.log(data);
      };
  

    return (
        <div>
        {groups && groups.map((group) => (
            <Link key={group.id} href={`/group/${group.id}`} className="mt-4 p-4 bg-MainColor rounded-[21px] flex items-center h-fit w-[1030px] gap-4">
            <Image src="/postImage.png" alt="" width="208" height="237"/>
            <div className="w-full">
               <div className="flex items-center justify-between mb-4">
                    <p className="text-[24px] text-white font-semibold">/{group?.title}</p>
                    <div className="flex items-end gap-4">
                        <button
                            className="px-4 py-2 bg-AccnetColor rounded-[10px] text-white text-[22px] font-semibold"
                            onClick={(e) =>{
                                e.preventDefault()
                                e.stopPropagation()
                                subscribeUser(group?.title)
                            }}

                        >
                            {userSubscribed.some((subscribeGroup) => subscribeGroup.id === group.id) ? "Відписатись" : "Підписатись"}
                        </button>
                    </div>
               </div>
               <p className="text-[14px] text-white mb-6 line-clamp-3">
                    <strong>Опис: </strong>{group?.description}
               </p>
               <div className="flex justify-between">
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
                <p className="text-[14px] text-white font-semibold mr-4 mt-1">317,731  Підписників</p>
                </div>
            </div>
        </Link>
        
        )) 
        }
        </div>
     );
}
 
export default GroupPage;