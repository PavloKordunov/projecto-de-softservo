"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const TopicPage = () => {

    const [topic, setTopic] = useState<any[]>([]);

    useEffect(() => {
        const getAllPost = async () => {
          const res = await fetch("http://localhost:8080/api/topics");
          const data = await res.json();
          setTopic(data.body);
          console.log(data);
        };
    
        getAllPost();
      }, []);

    return ( 
        <div className="px-5 py-4 flex-wrap flex items-center justify-between h-fit w-[1030px]">
            {topic.length > 0 ? (
                topic.map((topic) => (
                <Link href="/topics/:id" key={topic.id} className="bg-MainColor w-[265px] h-fit rounded-br-[14px] rounded-bl-[14px]">
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