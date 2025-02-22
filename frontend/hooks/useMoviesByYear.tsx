import { useState, useEffect } from "react";
import { getAllMoviesByYear, MovieDetails } from "@/api/omdbApi/omdbApi";

export const useMoviesByYear = (year: number) => {
    const [movies, setMovies] = useState<MovieDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getAllMoviesByYear(year)
            .then((movies) => {
                const sortedMovies = movies.sort((a, b) => new Date(a.Released).getTime() - new Date(b.Released).getTime());
                setMovies(sortedMovies);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching movies:", err);
                setError("Не вдалося завантажити фільми.");
                setLoading(false);
            });
    }, [year]);

    return { movies, loading, error };
};
