const API_KEY: string = 'd0281bd1';
const BASE_URL: string = 'https://www.omdbapi.com';

interface MovieSearchResult {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

interface SearchResponse {
    Response: "True" | "False";
    Search?: MovieSearchResult[];
    totalResults?: string;
    Error?: string;
}

export interface MovieDetails {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: { Source: string; Value: string }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: "True" | "False";
}

export const getAutoFillData = async (movieName: string, year?: number): Promise<MovieDetails | void> => {
    try {
        const searchResponse = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${movieName}&y=${year}`);
        const searchData: SearchResponse = await searchResponse.json();

        if (searchData.Response === "True" && searchData.Search) {
            const imdbID = searchData.Search[0].imdbID;
            const detailsResponse = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbID}`);
            const movieDetails: MovieDetails = await detailsResponse.json();
            return movieDetails;
        } else {
            console.log("No results found for the movie.");
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
    }
};

export const getAllMoviesByYear = async (year: number): Promise<MovieDetails[]> => {
    if (!year || typeof year !== 'number') {
        throw new Error('A valid year must be provided');
    }

    const allMovies: MovieSearchResult[] = [];
    let page = 1;
    let hasMoreMovies = true;

    try {
        while (hasMoreMovies) {
            const url = `${BASE_URL}/?apikey=${API_KEY}&s=movie&y=${year}&page=${page}`;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data: SearchResponse = await res.json();

            if (data.Response === "False" || !data.Search) {
                console.error("API Error:", data.Error);
                hasMoreMovies = false;
            } else {
                console.log(`Movies from ${year}, Page ${page}:`, data.Search);
                allMovies.push(...data.Search);
                page++;

                const totalResults = parseInt(data.totalResults || "0", 10);
                if (allMovies.length >= totalResults) {
                    hasMoreMovies = false;
                }
            }
        }

        const detailedMovies: MovieDetails[] = [];
        for (const movie of allMovies) {
            try {
                const detailsUrl = `${BASE_URL}/?apikey=${API_KEY}&i=${movie.imdbID}`;
                const detailsResponse = await fetch(detailsUrl);
                if (!detailsResponse.ok) {
                    console.error(`Failed to fetch details for movie ID: ${movie.imdbID}`);
                    continue;
                }
                const movieDetails: MovieDetails = await detailsResponse.json();
                detailedMovies.push(movieDetails);
            } catch (error) {
                console.error(`Error fetching details for movie ID: ${movie.imdbID}`, error);
            }
        }

        console.log(`Detailed movies from ${year}:`, detailedMovies);
        return detailedMovies;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};
