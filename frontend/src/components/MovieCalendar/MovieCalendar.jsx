import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import css from "./MovieCalendar.module.css";

const MovieCalendar = ({ movies, onClose }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const movieDates = movies.map((movie) => ({
        date: new Date(movie.releaseDate),
        title: movie.title,
    }));

    const isMovieDate = (date) =>
        movieDates.some(
            (movie) => movie.date.toDateString() === date.toDateString()
        );

    const tileContent = ({ date, view }) => {
        if (view === "month" && isMovieDate(date)) {
            const movie = movieDates.find(
                (movie) => movie.date.toDateString() === date.toDateString()
            );
            return (
                <div className={css.dateContainer}>
                    <span className={css.dot}></span>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={css.MovieCalendarOverlay}>
            <div className={css.MovieCalendarContainer}>
                <button className={css.CloseButton} onClick={onClose}>
                    ✖
                </button>
                <Calendar
                    className={css.ReactCalendar}
                    onChange={handleDateChange}
                    tileContent={tileContent}
                />
                {selectedDate && (
                    <div className={css.MovieList}>
                        <h3>Фільми на {selectedDate.toDateString()}:</h3>
                        <ul>
                            {movies
                                .filter(
                                    (movie) =>
                                        new Date(movie.releaseDate).toDateString() ===
                                        selectedDate.toDateString()
                                )
                                .map((movie) => (
                                    <li key={movie.id}>{movie.title}</li>
                                ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieCalendar;
