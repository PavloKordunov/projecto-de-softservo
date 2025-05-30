"use client"

import AutoFillPost from "@/components/AutoFillPost";
import { useUser } from "@/hooks/useUser";
import { searchTrailer } from "@/lib/youtubeService";
import { set } from "date-fns";
import { Dirent } from "fs";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FilmData {
    Title: string;
    imdbRating: string;
    Country: string;
    Genre: string;
    Author: any;
    Runtime: string;
    Plot: string;
    Poster: string;
    Released: string;
    Director: string;
    Actors: string;
    Trailer?: string;
    TrailerEmbed?: string;
  }

  interface Tag {
    id: string;
    name: string;
  }

const AdminPostMenu = () => {
    const router = useRouter();
    const {user} = useUser()
    const [postMode, setPostMode] = useState("film");
    const [showModal, setShowModal] = useState(true); 
    const [filmData, setFilmData] = useState<FilmData | null>(null);
    const [base64, setBase64] = useState<string | null>(null);
    const [limitAge, setLimitAge] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        author: user?.id,
        IMDB: '',
        country: '',
        genre: '',
        duration: '',
        description: "",
        limitAge: limitAge,
        topicType: postMode,
        actor: "",
        director: "",
        image: "",
        seasoneAmount: "",
        runtime: "",
        tagDtos: null,
        trailerURL: '',
        tagsId: [] as string[],
    });
    const [tagQuery, setTagQuery] = useState("");
    const [suggestedTags, setSuggestedTags] = useState<Tag[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const { theme } = useTheme();   

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

    const getFilmApiData = (data: FilmData) => {
        setFilmData(data);
    };

    const handleCreateTopic = async () => {
        try {
            const groupData = await handleCreateGroup();
    
            const updatedFormData = {
                ...formData,
                groupId: groupData.id,
            };
    
            const res = await fetch("https://localhost:8080/api/topics/create", {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user?.accessToken}`
                },
                body: JSON.stringify(updatedFormData)
            });
    
            const data = await res.json();
            console.log("Topic created:", data);
            console.log("Form data:", updatedFormData);
            router.push("/home");
    
        } catch (error) {
            console.log("Error:", error);
        }
    };
    

    useEffect(() => {
        if (filmData) {
            setFormData((prev) => ({
                ...prev,
                title: filmData?.Title || '',
                IMDB: filmData?.imdbRating || '',
                country: filmData?.Country || '',
                genre: filmData?.Genre || '',
                duration: filmData?.Runtime || '',
                description: filmData?.Plot || '',
                image: filmData?.Poster,
                releaseDate: filmData?.Released || '',
                director: filmData?.Director || '',
                actor: filmData?.Actors || '',
            }));
            setBase64(filmData?.Poster);
        }
    }, [filmData]);

    const fetchTrailer = async (title: string) => {
        if (!title) return;
        
        const trailerData = await searchTrailer(title);
        if (trailerData) {
            setFormData(prev => ({
                ...prev,
                trailerURL: trailerData.url
            }));

            if (filmData) {
                setFilmData({
                    ...filmData,
                    Trailer: trailerData.url,
                    TrailerEmbed: trailerData.embedUrl
                });
            }
        }
    };

    const handleCreateGroup = async() => {
        try {
            const res = await fetch("https://localhost:8080/api/groups/create", {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.accessToken}`,
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    userId: user?.id,
                    isPublic: true,
                    image: formData.image,
                    tagsId: formData.tagsId,
                }),
            });
            const data = await res.json();

            return data.body;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({ ...prev, author: user.id }));
        }
    }, [user]);

    useEffect(() => {
        setFormData((prev) => ({ ...prev, limitAge }));
    }, [limitAge]);
    
    useEffect(() => {
        if (filmData?.Title) {
            fetchTrailer(filmData.Title);
        }
    }, [filmData?.Title]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    function encodeImageFileAsURL(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onloadend = function () {
          const base64String = reader.result as string;
          setBase64(base64String);
          setFormData((prev) => ({
            ...prev,
            image: base64String,
        }));
          console.log('RESULT:', base64String);
        };
        reader.readAsDataURL(file);
    }

    const addTag = (tag: Tag) => {
        if (!formData.tagsId.includes(tag.id)) {
            setFormData((prev) => ({
                ...prev,
                tagsId: [...prev.tagsId, tag.id]
            }));
            setTags((prev) => [...prev, tag]);
        }
        setTagQuery("");
        setSuggestedTags([]);
    };

    return (
        <div className="mt-4 w-[1030px] bg-[#1E1F20] rounded-[31px] px-6 py-10 relative">
            <div>
                {showModal && (
                    <AutoFillPost
                        onClose={() => setShowModal(false)}
                        getFilmApiData={getFilmApiData}
                    />
                )}
            </div>
            <div className="flex justify-center mb-10">
                <h1 className="text-4xl font-bold text-[#F4F6F8]">Добавити фільм, серіал або книгу</h1>
                <svg
                    className="fill-[#F4F6F8] absolute top-10 right-10 cursor-pointer"
                    width='33'
                    height='33'
                    onClick={() => router.push("/admin-page")}
                >
                    <use href={`/sprite.svg#closeBtnIcon`} />
                </svg>
            </div>
            <div className="flex  mb-6">
                <div className="mr-24">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Створити</h2>
                        <div className="flex items-center gap-4">
                            <button
                                className={`px-6 py-2 bg-[#2c353d] rounded-[26px] text-[#C5D0E6] text-sm ${postMode === "film" ? "bg-[#FF4155]" : ""}`}
                                onClick={() => setPostMode("film")}
                            >
                                Фільм
                            </button>
                            <button
                                className={`px-6 py-2 bg-[#2c353d] rounded-[26px] text-[#C5D0E6] text-sm ${postMode === "serial" ? "bg-[#FF4155]" : ""}`}
                                onClick={() => setPostMode("serial")}
                            >
                                Серіал
                            </button>
                            <button
                                className={`px-6 py-2 bg-[#2c353d] rounded-[26px] text-[#C5D0E6] text-sm ${postMode === "book" ? "bg-[#FF4155]" : ""}`}
                                onClick={() => setPostMode("book")}
                            >
                                Книга
                            </button>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Назва:</h2>
                        <input
                            className="w-[478px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                            type='text'
                            name='title'
                            placeholder='Введіть назву, вибраного вище поста...'
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Вікові обмеження:</h2>
                        <div className="flex items-center gap-4">
                            <button className={`px-6 py-2 bg-[#2c353d] ${limitAge === 0 ? "bg-[#FF4155]" : ""} rounded-[26px] text-[#C5D0E6] text-sm`} onClick={() => setLimitAge(0)}>0+</button>
                            <button className={`px-6 py-2 bg-[#2c353d] ${limitAge === 6 ? "bg-[#FF4155]" : ""} rounded-[26px] text-[#C5D0E6] text-sm`} onClick={() => setLimitAge(6)}>6+</button>
                            <button className={`px-6 py-2 bg-[#2c353d] ${limitAge === 12 ? "bg-[#FF4155]" : ""} rounded-[26px] text-[#C5D0E6] text-sm`} onClick={() => setLimitAge(12)}>12+</button>
                            <button className={`px-6 py-2 bg-[#2c353d] ${limitAge === 16 ? "bg-[#FF4155]" : ""} rounded-[26px] text-[#C5D0E6] text-sm`} onClick={() => setLimitAge(16)}>16+</button>
                            <button className={`px-6 py-2 bg-[#2c353d] ${limitAge === 18 ? "bg-[#FF4155]" : ""} rounded-[26px] text-[#C5D0E6] text-sm`} onClick={() => setLimitAge(18)}>18+</button>
                        </div>
                    </div>
                    {(postMode === 'film' || postMode === 'serial') && (
                        <>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Рейтинг IMBD:</h2>
                                <input
                                    className="w-[478px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                                    type='text'
                                    name='IMDB'
                                    placeholder='Введіть рейтинг IMBD для даного поста...'
                                    value={formData.IMDB}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Посилання на трейлер:</h2>
                                <input
                                    className="w-[478px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                                    type='text'
                                    name='trailerLink'
                                    value={formData.trailerURL}
                                    placeholder='Введіть посилання на трейлер для даного поста...'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}

                    {postMode === 'book' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-[#F4F6F8] mr-9 whitespace-nowrap">Мова оригіналу:</h2>
                                <input
                                    className="w-full h-8 bg-[#2C353D] rounded-[26px] px-2 text-[#C5D0E6] text-sm"
                                    list='country'
                                    name='country'
                                    placeholder='Виберіть мову'
                                    value={formData.country}
                                    onChange={handleInputChange}
                                />
                                <datalist id='country'>
                                    <option>США</option>
                                    <option>Англія</option>
                                </datalist>
                            </div>
                            <div className=" mb-6">
                                <h2 className="text-3xl mb-4 font-semibold text-[#F4F6F8] mr-9 whitespace-nowrap">Рівень складності тексту:</h2>
                                <input
                                    className="w-60 h-8 bg-[#2C353D] rounded-[26px] px-2 text-[#C5D0E6] text-sm"
                                    list='country'
                                    name='country'
                                    placeholder='Виберіть складність тексту'
                                    value={formData.country}
                                    onChange={handleInputChange}
                                />
                                <datalist id='country'>
                                    <option>Тяжкий</option>
                                    <option>Легкий</option>
                                </datalist>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Кількість сторінок:</h2>
                                <input
                                    className="w-[478px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                                    type='text'
                                    name='duration'
                                    placeholder='Введіть кількість сторінок'
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    )}

                    <div className="relative flex items-center gap-4">
                        {tags.length > 0 && <div className="flex flex-wrap gap-2 mb-3">
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
                    {postMode === 'serial' && (
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Кількість сезонів:</h2>
                            <input
                                className="w-[478px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                                type='text'
                                name='seasoneAmount'
                                placeholder='Введіть кількість сезонів'
                                value={formData.seasoneAmount}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}
                </div>
                <div>
                    <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-[#F4F6F8] mr-9 whitespace-nowrap">Країна:</h2>
                        <input
                            className="w-full h-8 bg-[#2C353D] rounded-[26px] px-2 text-[#C5D0E6] text-sm"
                            list='country'
                            name='country'
                            placeholder='Виберіть країну'
                            value={formData.country}
                            onChange={handleInputChange}
                        />
                        <datalist id='country'>
                            <option>USA</option>
                            <option>GBP</option>
                        </datalist>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-[#F4F6F8]">Жанр:</h2>
                        <input
                            className="w-[180px] h-8 bg-[#2C353D] rounded-[26px] px-2 text-[#C5D0E6] text-sm"
                            list='genre'
                            name='genre'
                            placeholder='Виберіть жанр'
                            value={formData.genre}
                            onChange={handleInputChange}
                        />
                        <datalist id='genre'>
                            <option>comedy</option>
                            <option>horror</option>
                        </datalist>
                    </div>
                    {postMode === 'book' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-[#F4F6F8] whitespace-nowrap">Чи є адаптація:</h2>
                                <input
                                    className="w-[120px] h-8 bg-[#2C353D] rounded-[26px] px-2 text-[#C5D0E6] text-sm"
                                    list='country'
                                    name='country'
                                    placeholder='Виберіть чи є адаптація'
                                    value={formData.country}
                                    onChange={handleInputChange}
                                />
                                <datalist id='country'>
                                    <option>так</option>
                                    <option>ні</option>
                                </datalist>
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-[#F4F6F8] whitespace-nowrap">На реальних подіях:</h2>
                                <input
                                    className="w-[80px] h-8 bg-[#2C353D] rounded-[26px] px-2 text-[#C5D0E6] text-sm"
                                    list='country'
                                    name='country'
                                    placeholder='так/ні'
                                    value={formData.country}
                                    onChange={handleInputChange}
                                />
                                <datalist id='country'>
                                    <option>так</option>
                                    <option>ні</option>
                                </datalist>
                            </div>
                        </div>
                    )}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Фото:</h2>
                        <form>
                            {base64 ? (
                                <div className="relative w-fit">
                                    <Image src={base64} alt="" width={2} height={2} className="w-fit h-[256]" />
                                    <svg onClick={() => setBase64('')} className="absolute top-[10px] right-[10px] w-7 h-8" fill="#FF4155">
                                        <use href={`/sprite.svg?v=1#bucket-icon`}></use>
                                    </svg>
                                </div>
                            ): (
                                <div id="drop-area" className="w-full h-[214px] bg-[#2C353D] rounded-lg flex flex-col justify-center items-center text-[#b0b0b0]">
                            <p>Перетягніть сюди фото</p>
                            <label htmlFor="fileInput" className="mt-4 px-6 py-2 bg-[#2c353d] text-white rounded-md cursor-pointer">Оберіть файл</label>
                            <input
                                className="hidden"
                                type="file"
                                id="fileInput"
                                accept=".jpg, .jpeg, .png"
                                onChange={encodeImageFileAsURL}
                                multiple
                            />
                            </div>
                        )}
                        </form>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Посилання на групу:</h2>
                        <input
                            className="w-[344px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                            type='text'
                            name='groupLink'
                            placeholder='Введіть посилання на групу для даного поста...'
                            onChange={handleInputChange}
                        />
                    </div>
                    {(postMode === 'film' || postMode === 'serial') && (
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Тривалість:</h2>
                            <input
                                className="w-[344px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                                type='text'
                                name='duration'
                                placeholder='Введіть тривалість'
                                value={formData.duration}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}
                    {postMode === 'serial' && (
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Загальна кількість серій:</h2>
                            <input
                                className="w-[344px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                                type='text'
                                name='runtime'
                                placeholder='Введіть кількість серій'
                                value={formData.runtime}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Короткий опис:</h2>
                <textarea
                    className="w-[913px] h-[240px] bg-[#2C353D] rounded-xl p-4 text-[#C5D0E6] text-sm resize-none"
                    name='description'
                    placeholder='Введіть короткий опис для даного поста...'
                    onChange={handleInputChange}
                    value={formData.description}
                />
            </div>
            {(postMode === 'film' || postMode === 'serial') && (
                <>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Режисери:</h2>
                        <div className="flex items-center gap-6">
                            <input
                                className="w-[478px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                                type='text'
                                name='director'
                                value={formData.director}
                                placeholder='Введіть прізвище та ім’я режисера...'
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Актори:</h2>
                        <div className="flex items-center gap-6">
                            <input
                                className="w-[478px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                                type='text'
                                value={formData.actor}
                                name='actor'
                                placeholder='Введіть прізвище та ім’я актора...'
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </>
            )}
            <div className="flex justify-end mt-10">
                <button className="px-6 py-2 bg-[#FF4155] rounded-md text-[#C5D0E6] text-sm font-semibold h-[43px] w-[218px]" onClick={handleCreateTopic}>Створити пост</button>
            </div>
        </div>
    );
};

export default AdminPostMenu;