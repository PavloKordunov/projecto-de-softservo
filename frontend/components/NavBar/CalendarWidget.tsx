"use client";

import { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MovieDetails } from "@/api/omdbApi/omdbApi";
import { useTheme } from "next-themes";

interface MovieCalendarProps {
    onClose: () => void;
    movies: MovieDetails[];
}

const CalendarWidget = ({ onClose, movies }: MovieCalendarProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();
    const handleDateChange = (value: Date | [Date, Date] | null, event?: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedDate(value instanceof Date ? value : null);
    };


    const movieDates = movies.map((movie) => ({
        date: new Date(movie.Released),
        title: movie.Title,
    }));

    const isMovieDate = (date: Date) =>
        movieDates.some((movie) => movie.date.toDateString() === date.toDateString());

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === "month" && isMovieDate(date)) {
            return (
                <div className="relative">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full absolute top-[-10] right-1"></span>
                </div>
            );
        }
        return null;
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div ref={modalRef} className={`${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} w-[380px] h-fit p-[20px] rounded-[10px] relative  max-w-lg text-red`}>
                <Calendar
                    className="react-calendar custom-calendar max-w-full aspect-[1.1]"
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileContent={tileContent}
                    tileClassName={({ date, view }) => {
                        if (view === "month" && isMovieDate(date)) {
                            return "bg-red-200";
                        }
                        return "";
                    }}
                />

                {selectedDate && (
                    <div className="mt-6">
                        <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Фільми на {selectedDate.toDateString()}:</h3>
                        <ul className="mt-4 space-y-2">
                            {movies
                                .filter(
                                    (movie) => new Date(movie.Released).toDateString() === selectedDate.toDateString()
                                )
                                .map((movie) => (
                                    <li key={movie.imdbID} className={`text-sm rounded-[10px] p-[10px] text-AccnetColor ${theme === 'dark' ? 'text-AccnetColor' : 'text-AccnetColor bg-[#EAEAEA]'}`}>
                                        {movie.Title}
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarWidget;
