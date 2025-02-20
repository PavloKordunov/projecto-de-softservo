"use client";

import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getAllMoviesByYear, MovieDetails } from "@/api/omdbApi/omdbApi";

interface MovieCalendarProps {
    onClose: () => void;
}

const CalendarWidget = ({ onClose }: MovieCalendarProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [movies, setMovies] = useState<MovieDetails[]>([]);
    const calendarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getAllMoviesByYear(2025)
            .then((movies) => {
                const sortedMovies = movies.sort((a, b) => {
                    const dateA = new Date(a.Released);
                    const dateB = new Date(b.Released);
                    return dateA.getTime() - dateB.getTime();
                });
                setMovies(sortedMovies);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    const handleDateChange = (date: Date | Date[] | null) => {
        setSelectedDate(date instanceof Date ? date : null);
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

    const handleClickOutside = (event: MouseEvent) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-70 flex justify-center items-center z-50">
            <div ref={calendarRef} className="bg-SecondaryColor p-6 rounded-lg relative w-full max-w-lg text-red">
                <button className="absolute top-4 right-4 text-2xl text-white bg-transparent" onClick={onClose}>
                    ✖
                </button>
                <Calendar
                    className="react-calendar w-full custom-calendar"
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
                        <h3 className="text-xl font-semibold text-white">Фільми на {selectedDate.toDateString()}:</h3>
                        <ul className="mt-4 space-y-2">
                            {movies
                                .filter(
                                    (movie) => new Date(movie.Released).toDateString() === selectedDate.toDateString()
                                )
                                .map((movie) => (
                                    <li key={movie.imdbID} className="text-sm text-AccnetColor">
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
