const API_KEY = '1a243e1a'
const BASE_URL = `http://www.omdbapi.com`

export const getAutoFillData = async (movieName, year) => {

    const searchResponse = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${movieName}&y=${year}`);
    const searchData = await searchResponse.json();

    if (searchData.Response === "True") {
        const imdbID = searchData.Search[0].imdbID;

        const detailsResponse = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbID}`);
        const movieDetails = await detailsResponse.json();

        return movieDetails;
    } else {
        console.log("No results found for the movie.");
    }
};


export const getAllMoviesByYear = async (year) => {
    if (!year || typeof year !== 'number') {
        throw new Error('A valid year must be provided');
    }

    const allMovies = [];
    let page = 1;
    let hasMoreMovies = true;

    try {
        while (hasMoreMovies) {
            const url = `${BASE_URL}/?apikey=${API_KEY}&s=movie&y=${year}&page=${page}`;

            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            if (data.Response === "False") {
                console.error("API Error:", data.Error);
                hasMoreMovies = false;
            } else {
                allMovies.push(...data.Search);
                page++;

                const totalResults = parseInt(data.totalResults, 10);
                if (allMovies.length >= totalResults) {
                    hasMoreMovies = false;
                }
            }
        }

        const detailedMovies = [];
        for (const movie of allMovies) {
            try {
                const detailsUrl = `${BASE_URL}/?apikey=${API_KEY}&i=${movie.imdbID}`;
                const detailsResponse = await fetch(detailsUrl);

                if (!detailsResponse.ok) {
                    console.error(`Failed to fetch details for movie ID: ${movie.imdbID}`);
                    continue; 
                }

                const movieDetails = await detailsResponse.json();
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



