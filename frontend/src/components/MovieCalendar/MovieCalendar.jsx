import { useState, useEffect} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import css from "./MovieCalendar.module.css";
import {getAllMoviesByYear} from "../../api/omdbApi";


const MovieCalendar = ({ onClose }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [movies, setMovieas] = useState([])

    useEffect(() => {
        getAllMoviesByYear(2025)
        .then((movie) => {
            const sortedMovies = movie.sort((a, b) => {
                const dateA = new Date(a.Released);
                const dateB = new Date(b.Released);
                return dateA - dateB; 
            });
    
            console.log("Movies sorted by Released date:", sortedMovies);
            setMovieas(sortedMovies)
        }
    )
        .catch((error) => {
            console.error("Error fetching movies:", error);
        });
    
    })
    useEffect(() => {
        console.log(selectedDate)
    }, [selectedDate])

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const movieDates = movies.map((movie) => ({
        date: new Date(movie.Released),
        title: movie.Title,
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
                                        new Date(movie.Released).toDateString() ===
                                        selectedDate.toDateString()
                                )
                                .map((movie) => (
                                    <li key={movie.id}>{movie.Title}</li>
                                ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieCalendar;
