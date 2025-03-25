'use client';

import { useState } from 'react';

const API_KEY = '1a243e1a';
const BASE_URL = 'https://www.omdbapi.com';

const getAutoFillData = async (movieName: string, year: string) => {
    try {
        const searchResponse = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${movieName}&y=${year}`);
        const searchData = await searchResponse.json();

        if (searchData.Response === "True") {
            const imdbID = searchData.Search[0].imdbID;
            const detailsResponse = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbID}`);
            return await detailsResponse.json();
        } else {
            console.error("No results found for the movie.");
        }
    } catch (error) {
        console.error("Failed to fetch movie data.", error);
    }
};

const AutoFillPost = ({ onClose, getFilmApiData } : {onClose: () => void, getFilmApiData: (data: any) => void }) => {
    const [choseType, setChoseType] = useState(false);
    const [filmName, setFilmName] = useState("");
    const [filmReleaseDay, setFilmReleaseDay] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = await getAutoFillData(filmName, filmReleaseDay);
        if (data) {
            getFilmApiData(data);
            onClose();
        }
        console.log(data);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg text-center w-80">
                {!choseType ? (
                    <>
                        <h2 className="text-white text-lg font-semibold">Виберіть метод заповнення</h2>
                        <div className="mt-4 flex flex-col gap-3">
                            <button className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-red-500" onClick={onClose}>Заповнити вручну</button>
                            <button className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-red-500" onClick={() => setChoseType(true)}>Заповнити автоматично</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-white text-lg font-semibold">Введіть назву та рік фільму</h2>
                        <div className="mt-4 flex flex-col gap-3">
                            <input className="bg-gray-700 text-white p-2 rounded outline-none" onChange={(e) => setFilmName(e.target.value)} type="text" placeholder="Назва фільму" />
                            <input className="bg-gray-700 text-white p-2 rounded outline-none" onChange={(e) => setFilmReleaseDay(e.target.value)} type="text" placeholder="Рік виходу" />
                            <button className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-red-500" onClick={handleSubmit}>Відправити</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AutoFillPost;
