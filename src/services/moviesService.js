import axios from "axios";
// API documentation
// https://developers.themoviedb.org/3/getting-started/introduction
// Constant endpoints
const apiKey = '?api_key=6f26fd536dd6192ec8a57e94141f8b20'
const highlightedEP = 'https://api.themoviedb.org/3/movie/now_playing'
const popularEP = 'https://api.themoviedb.org/3/movie/popular'
const singleMovieEP = 'https://api.themoviedb.org/3/movie/'
const imageBaseURL = "https://image.tmdb.org/t/p/w500"


export const getHighlightedMovie = async () => {
    const response = await axios.get(highlightedEP + apiKey);
    const movieId = response.data.results[0].id;
    const highlightedMovie = await axios.get(singleMovieEP + movieId + apiKey)
    
    return highlightedMovie.data
}

export const getPopularMovies = async () => {
    const response = await axios.get(popularEP + apiKey);
    const popularMovies = response.data.results;
    popularMovies.forEach(movie=> {
        movie.backdrop_path = imageBaseURL + movie.backdrop_path
    });
    return popularMovies
}