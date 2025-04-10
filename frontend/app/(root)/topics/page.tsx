"use client";

import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const TopicPage = () => {
    const [topic, setTopic] = useState<any[]>([]);
    const { user } = useUser();
    const [filterType, setFilterType] = useState<string | null>('releaseDate');
    const [sortType, setSortType] = useState<string | null>('asc');
    const { theme } = useTheme();
    const [genre, setGenre] = useState('');
    const [searchType, setSearchType] = useState('basic');

    const getTopicsByGenre = async () => {
        if (!genre) return;
        
        const res = await fetch(`https://localhost:8080/api/topics/genre/${genre}?sort=${filterType}&order=${sortType}`, {
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${user?.accessToken ? `Bearer ${user?.accessToken}` : null}`,
            }
        });
        const data = await res.json();
        setTopic(data.body);
    };

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
    };

    useEffect(() => {
        if (searchType === "basic" || genre === '') {
            getAllTopics();
        } else if (searchType === "genre") {
            getTopicsByGenre();
        }
    }, [sortType, filterType, searchType, genre]);

    const handleGenreSearch = () => {
        if (genre) {
            setSearchType("genre");
        } else {
            setSearchType("basic");
        }
    };

    const filterPost = (filterType: string) => {
        setFilterType(filterType);
        setSortType((prevSortType) => {
            if (prevSortType === null) return "asc";
            if (prevSortType === "asc") return "desc";
            return null;
        });
    };

    return ( 
        <div className="px-5 py-4 flex-wrap flex items-center gap-10 h-fit w-[1030px]">
            <div className="w-full bg-MainColor gap-3 px-5 py-4 flex items-center h-fit rounded-[31px]">
                <button className={`px-4 py-3 ${filterType === 'IMDB' && (sortType === 'asc' || sortType=== "desc") ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}`} rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}
                    onClick={() => filterPost('IMDB')}>
                    <p>За IMDb рейтингом</p>
                    { (filterType === 'IMDB' && (sortType === 'asc' || sortType=== "desc")) && 
                    <svg className={`w-4 h-3 ${sortType === 'asc' ? 'rotate-180' : ""}`} fill="#fff">
                        <use href={`/sprite.svg#iconArrowDown`} />
                    </svg>
                    }
                </button>
                <button className={`px-5 py-3 ${filterType === 'userRate' && (sortType === 'asc' || sortType=== "desc") ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}`} rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}
                    onClick={() => filterPost('userRate')}>
                    <p>За рейтингом користувачів</p>
                    { (filterType === 'userRate' && (sortType === 'asc' || sortType=== "desc")) && 
                    <svg className={`w-4 h-3 ${sortType === 'asc' ? 'rotate-180' : ""}`} fill="#fff">
                        <use href={`/sprite.svg#iconArrowDown`} />
                    </svg>
                    }
                </button>
                <button className={`px-5 py-3 ${filterType === 'userRateCount' && (sortType === 'asc' || sortType=== "desc") ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}`} rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}
                    onClick={() => filterPost('userRateCount')}>
                    <p>За кількістю оцінок</p>
                    { (filterType === 'userRateCount' && (sortType === 'asc' || sortType=== "desc")) && 
                    <svg className={`w-4 h-3 ${sortType === 'asc' ? 'rotate-180' : ""}`} fill="#fff">
                        <use href={`/sprite.svg#iconArrowDown`} />
                    </svg>
                    }
                </button>
                <button className={`px-5 py-3 ${filterType === 'releaseDate' && (sortType === 'asc' || sortType=== "desc") ? 'bg-AccnetColor' : `${theme === 'dark' ? 'bg-[#434C55] text-white' : 'bg-[#B5B5B5] text-black'}`} rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}
                    onClick={() => filterPost('releaseDate')}>
                    <p>За датою</p>
                    { (filterType === 'releaseDate' && (sortType === 'asc' || sortType=== "desc")) && 
                    <svg className={`w-4 h-3 ${sortType === 'asc' ? 'rotate-180' : ""}`} fill="#fff">
                        <use href={`/sprite.svg#iconArrowDown`} />
                    </svg>
                    }
                </button>
                <div className="relative">
                    <input
                        className="w-[125px] h-[50px] bg-[#434C55] pl-2 pr-8 text-[#C5D0E6] text-sm border-none rounded-[10px] focus:outline-none"
                        list="genre"
                        name="genre"
                        placeholder="За жанром"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                    <datalist id="genre">
                    </datalist>
                    <svg 
                        className="w-8 h-6 absolute top-[25%] right-0 cursor-pointer" 
                        fill="#fff" 
                        onClick={handleGenreSearch}
                    >
                        <use href="/sprite.svg#iconSearch" />
                    </svg>
                </div>
            </div>
            {topic ? (
                topic.map((topic) => (
                    <Link href={`/topics/${topic.id}`} key={topic.id} className={`${theme === 'dark' ? 'bg-MainColor' : 'bg-[#E4E3E3]'} w-[295px] h-fit rounded-br-[14px] rounded-t-[14px] rounded-bl-[14px]`}>
                        <Image 
                            src={topic.image} 
                            alt="Movie Poster" 
                            width={295}
                            height={460}
                            className="mb-2 w-full h-[425px] object-cover rounded-t-[14px]"
                        />
                        <p className={`ml-3 ${theme === 'dark' ? 'text-white' : 'text-black'} text-center mb-4 text-[16px] font-bold`}>{topic.title}</p>
                    </Link>
                ))
            ) : (
                <p>Поки що немає постів...</p>
            )} 
        </div>
    );
}
 
export default TopicPage;