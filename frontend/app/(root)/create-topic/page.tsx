"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FilmData {
    Title: string;
    ImdbRating: string;
    Country: string;
    Genre: string;
    Runtime: string;
  }
  

const AdminPostMenu = () => {
    const router = useRouter();
    const [postMode, setPostMode] = useState("film");
    const [showModal, setShowModal] = useState(false); 
    const [filmData, setFilmData] = useState<FilmData | null>(null);
    const [base64, setBase64] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        IMDB: '',
        country: '',
        genre: '',
        duration: '',
        description: "",
        seasoneAmount: "",
        runtime: ""
    });

    const handleCreateTopic = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/topics/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }

        router.push("/home");
    };

    useEffect(() => {
        if (filmData) {
            setFormData((prev) => ({
                ...prev,
                title: filmData?.Title || '',
                IMDB: filmData?.ImdbRating || '',
                country: filmData?.Country || '',
                genre: filmData?.Genre || '',
                duration: filmData?.Runtime || '',
            }));
        }
    }, [filmData]);

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
          console.log('RESULT:', base64String);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="mt-4 w-[1030px] bg-[#1E1F20] rounded-[31px] px-6 py-10 relative">
            <div>
                {/* {showModal && (
                    <AutoFillPost
                        onClose={() => setShowModal(false)}
                        getFilmApiData={getFilmApiData}
                    />
                )} */}
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
                            <button className="px-6 py-2 bg-[#2c353d] rounded-[26px] text-[#C5D0E6] text-sm">0+</button>
                            <button className="px-6 py-2 bg-[#2c353d] rounded-[26px] text-[#C5D0E6] text-sm">6+</button>
                            <button className="px-6 py-2 bg-[#2c353d] rounded-[26px] text-[#C5D0E6] text-sm">12+</button>
                            <button className="px-6 py-2 bg-[#2c353d] rounded-[26px] text-[#C5D0E6] text-sm">16+</button>
                            <button className="px-6 py-2 bg-[#2c353d] rounded-[26px] text-[#C5D0E6] text-sm">18+</button>
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

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Хештеги:</h2>
                        <input
                            className="w-[478px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                            type='text'
                            name='hashtags'
                            placeholder='Введіть до 9 хештегів для даного поста...'
                            onChange={handleInputChange}
                        />
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
                            <div className="w-[240px] h-[43px] bg-[#2C353D] rounded-lg flex justify-center items-center text-[#b0b0b0]">
                                <p>Перетягніть сюди фото</p>
                            </div>
                            <input
                                className="w-[218px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                                type='text'
                                name='directorName'
                                placeholder='Введіть прізвище та ім’я...'
                                onChange={handleInputChange}
                            />
                            <button className="px-6 py-2 bg-[#FF4155] rounded-[26px] text-[#C5D0E6] text-sm font-semibold h-[43px]">Добавити ще</button>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-[#F4F6F8] mb-4">Актори:</h2>
                        <div className="flex items-center gap-6">
                            <div className="w-[240px] h-[43px] bg-[#2C353D] rounded-lg flex justify-center items-center text-[#b0b0b0]">
                                <p>Перетягніть сюди фото</p>
                            </div>
                            <input
                                className="w-[218px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                                type='text'
                                name='actorFilmName'
                                placeholder='Введіть прізвище та ім’я (у фільмі)...'
                                onChange={handleInputChange}
                            />
                            <input
                                className="w-[218px] h-[43px] bg-[#2c353d] rounded-md px-3 text-[#C5D0E6] text-sm"
                                type='text'
                                name='actorRealName'
                                placeholder='Введіть прізвище та ім’я (в житті)...'
                                onChange={handleInputChange}
                            />
                            <button className="px-6 py-2 bg-[#FF4155] rounded-[26px] text-[#C5D0E6] text-sm font-semibold h-[43px]">Добавити ще</button>
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