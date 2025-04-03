"use client";

import { useUser } from "@/hooks/useUser";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TopicPage = () => {

    const [topic, setTopic] = useState<any[]>([]);
    const { user} = useUser()
    const [filterType, setFilterType] = useState<string | null>('releaseDate');
    const [sortType, setSortType] = useState<string | null>('asc');
    const { theme } = useTheme();

    useEffect(() => {
        const getAllTopics = async () => {
          const res = await fetch(`https://localhost:8080/api/topics?sort=${filterType}&order=${sortType}`, {
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
      }, [sortType, filterType]);

      const filterPost = (filterType: string) => {
        if (filterType === "IMDB") {
            setSortType((prevSortType) => {
                if (prevSortType === null) return "asc";
                if (prevSortType === "asc") return "desc";
                return null;
            });
        }
        if (filterType === "userRate") {
          setSortType((prevSortType) => {
              if (prevSortType === null) return "asc";
              if (prevSortType === "asc") return "desc";
              return null;
          });
      } 
      if (filterType === "userRateCount") {
        setSortType((prevSortType) => {
            if (prevSortType === null) return "asc";
            if (prevSortType === "asc") return "desc";
            return null;
        });
    }  
    if (filterType === "releaseDate") {
      setSortType((prevSortType) => {
          if (prevSortType === null) return "asc";
          if (prevSortType === "asc") return "desc";
          return null;
      });
  }
    };

    return ( 
        <div className="px-5 py-4 flex-wrap flex items-center gap-10 h-fit w-[1030px]">
          <div className="w-full bg-MainColor gap-4 px-5 py-4 flex items-center h-fit rounded-[31px]">
            <button className={`px-5 py-3 ${filterType === 'IMDB' && (sortType === 'asc' || sortType=== "desc") ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}`} rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}
              onClick={() => {
                  filterPost('IMDB')
                  setFilterType('IMDB')
              }
              }>
              <p>За IMDb рейтингом</p>
              { (filterType === 'IMDB' && (sortType === 'asc' || sortType=== "desc")) && 
              <svg className={`w-4 h-3 ${sortType === 'asc' ? 'rotate-180' : ""}`} fill="#fff">
                  <use href={`/sprite.svg#iconArrowDown`} />
              </svg>
              }

          </button>
          <button className={`px-5 py-3 ${filterType === 'userRate' && (sortType === 'asc' || sortType=== "desc") ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}`} rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}
              onClick={() => {
                  filterPost('userRate')
                  setFilterType('userRate')
              }
              }>
              <p>За рейтингом користувачів</p>
              { (filterType === 'userRate' && (sortType === 'asc' || sortType=== "desc")) && 
              <svg className={`w-4 h-3 ${sortType === 'asc' ? 'rotate-180' : ""}`} fill="#fff">
                  <use href={`/sprite.svg#iconArrowDown`} />
              </svg>
              }

          </button>
          <button className={`px-5 py-3 ${filterType === 'userRateCount' && (sortType === 'asc' || sortType=== "desc") ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}`} rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}
              onClick={() => {
                  filterPost('userRateCount')
                  setFilterType('userRateCount')
              }
              }>
              <p>За кількістю оцінок</p>
              { (filterType === 'userRateCount' && (sortType === 'asc' || sortType=== "desc")) && 
              <svg className={`w-4 h-3 ${sortType === 'asc' ? 'rotate-180' : ""}`} fill="#fff">
                  <use href={`/sprite.svg#iconArrowDown`} />
              </svg>
              }

          </button>
          <button className={`px-5 py-3 ${filterType === 'releaseDate' && (sortType === 'asc' || sortType=== "desc") ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}`} rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}
              onClick={() => {
                  filterPost('releaseDate')
                  setFilterType('releaseDate')
              }
              }>
              <p>За датою</p>
              { (filterType === 'releaseDate' && (sortType === 'asc' || sortType=== "desc")) && 
              <svg className={`w-4 h-3 ${sortType === 'asc' ? 'rotate-180' : ""}`} fill="#fff">
                  <use href={`/sprite.svg#iconArrowDown`} />
              </svg>
              }

          </button>
          </div>
            {topic ? (
                topic.map((topic) => (
                <Link href={`/topics/${topic.id}`} key={topic.id} className="bg-MainColor w-[295px] h-fit rounded-br-[14px] rounded-bl-[14px]">
                    <Image 
                        src={topic.image} 
                        alt="Movie Poster" 
                        width={295}
                        height={460}
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