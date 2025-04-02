"use client";

import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TopicPage = () => {

    const [topic, setTopic] = useState<any[]>([]);
    const { user} = useUser()

    useEffect(() => {
        const getAllTopics = async () => {
          const res = await fetch("https://localhost:8080/api/topics", {
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `${user?.accessToken ? `Bearer ${user?.accessToken}` : null}`,
            }
          });
          const data = await res.json();
          setTopic(data.body);
          console.log(data);
        };
    
        getAllTopics();
      }, []);

    return ( 
        <div className="px-5 py-4 flex-wrap flex items-center gap-5 h-fit w-[1030px]">
            {topic ? (
                topic.map((topic) => (
                <Link href={`/topics/${topic.id}`} key={topic.id} className="bg-MainColor w-[265px] h-fit rounded-br-[14px] rounded-bl-[14px]">
                    <Image 
                        src={topic.image} 
                        alt="Movie Poster" 
                        width={265}
                        height={425}
                        className="mb-2 w-full h-[425px] object-cover"
                    />
                    <p className=" ml-3 text-white text-center mb-4 text-[16px] font-bold">{topic.title} </p>
                </Link>
                 ))
            ) : (
                <p>Поки що немає постів...</p>
            )} 
        </div>
     );
}
 
export default TopicPage;