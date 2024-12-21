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
        // console.log(movieDetails);
    } else {
        console.log("No results found for the movie.");
    }
};

export const getMoviesByYear = (year, page = 1) => {
    if (!year || typeof year !== 'number') {
        throw new Error('A valid year must be provided');
    }

    const url = `${BASE_URL}/?apikey=${API_KEY}&s=movie&y=${year}&page=${page}`;

    return fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            if (data.Response === "False") {
                console.error("API Error:", data.Error);
            } else {
                console.log(`Movies from ${year}, Page ${page}:`, data.Search);
            }
            return data;
        })
        .catch(error => {
            console.error("Fetch error:", error);
            throw error;
        });
};

