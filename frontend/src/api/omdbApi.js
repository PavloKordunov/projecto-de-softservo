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
