import axios from "axios"
const apiKey = process.env.REACT_APP_APIKEY
const baseUrl = process.env.REACT_APP_BASEURL

export const getNPlayMovieList = async () => {
    const nplayMovie = await axios.get(`${baseUrl}/movie/now_playing?page=1&api_key=${apiKey} `)
    return nplayMovie.data.results
}
export const getPopMovieList = async () => {
    const popMovie = await axios.get(`${baseUrl}/movie/popular?page=1&api_key=${apiKey}&include_adult=true `)
    return popMovie.data.results
}
export const getTRatedMovieList = async () => {
    const topRatedMovie = await axios.get(`${baseUrl}/movie/top_rated?page=1&api_key=${apiKey}&include_adult=true `)
    return topRatedMovie.data.results
}
export const getUpcomingMovieList = async () => {
    const UpcomingMovie = await axios.get(`${baseUrl}/movie/upcoming?page=1&api_key=${apiKey}`)
    return UpcomingMovie.data.results
}

export const getTrendingAllList = async () => {
    const trendingMovie = await axios.get(`${baseUrl}/trending/all/week?page=1&api_key=${apiKey}`)
    return trendingMovie.data.results
}

export const getNPlaySeriesList = async () => {
    const nplaySeries = await axios.get(`${baseUrl}/tv/airing_today?page=1&api_key=${apiKey} `)
    return nplaySeries.data.results
}
export const getPopSeriesList = async () => {
    const popSeries = await axios.get(`${baseUrl}/tv/popular?page=1&api_key=${apiKey}&include_adult=true `)
    return popSeries.data.results
}
export const getTRatedSeriesList = async () => {
    const topRatedSeries = await axios.get(`${baseUrl}/tv/top_rated?page=1&api_key=${apiKey}&include_adult=true `)
    return topRatedSeries.data.results
}

export const searchMovie = async (q) => {
    const search = await axios.get(`${baseUrl}/search/movie?query=${q}&api_key=${apiKey}`)
    return search.data
}