import React, { useEffect, useState, useRef } from "react"
import { getPopMovieList, getUpcomingMovieList, getTrendingAllList, getPopSeriesList, getTRatedSeriesList } from '../api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronLeft, faChevronRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import CarouselPop from "./layout/carouselpop"
import Navigation from "./layout/navigation"
import 'animate.css';
import axios from "axios";
import './home.css'

const Home = () => {

    const [popularMovies, setPopularMovies] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [trendingList, setTrendingList] = useState([])
    const [popularSeries, setPopularSeries] = useState([])
    const [topRatedSeries, setTopRatedSeries] = useState([])
    const [genres, setGenres] = useState({});
    const [index, setIndex] = useState(0);
    const lastIndex = 2;
    const [backdrop, setBackdrop] = useState('');
    const [lastHoveredBackdrop, setLastHoveredBackdrop] = useState('');

    const handleHover = (path) => {
        setLastHoveredBackdrop(path)
    }

    useEffect(() => {
        getPopMovieList().then((result) => {
            setPopularMovies(result)
        })
        getUpcomingMovieList().then((result) => {
            setUpcomingMovies(result)
        })
        getTrendingAllList().then((result) => {
            setTrendingList(result)
            setLastHoveredBackdrop(result[0].backdrop_path)
        })
        getPopSeriesList().then((result) => {
            setPopularSeries(result)
        })
        getTRatedSeriesList().then((result) => {
            setTopRatedSeries(result)
        })


        const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_APIKEY}`;

        axios.get(GENRE_URL).then((response) => {
            const genreMap = {};
            response.data.genres.forEach((genre) => {
                genreMap[genre.id] = genre.name;
            });
            setGenres(genreMap);
        });
    }, [])

    const PopularMoviesList = () => {
        return popularMovies.slice(0, 5).map((movie, i) => {

            if (movie.title.length >= 18) {
                movie.title = movie.title.substring(0, 18) + "..."
            }
            if (movie.release_date.length >= 4) {
                movie.release_date = movie.release_date.substring(0, 4)
            }
            return (
                <div className="Mv-main-card w-48 text-start m-2" key={i}>
                    <div className="-spacing-24">
                        <img
                            className="rounded"
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                    <div className="Mv-title flex items-center h-10 font-bold text-gray-200 text-base ">
                        {movie.title}
                    </div>
                    <div className=" flex">
                        <div className="Mv-rate border-r pr-2 ml-1 text-sm text-gray-200 font-bold">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-500 pr-1" />
                            {movie.vote_average}
                        </div>
                        <div className="Mv-date font-mono text-sm text-gray-500 pl-2">
                            {movie.release_date}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xs mt-1 text-gray-400  ">{movie.genre_ids.slice(0, 3).map(id => genres[id]).join(', ')}{movie.genre_ids.length > 3 ? '...' : ''}

                        </h1>
                    </div>
                </div >
            )
        }
        )
    }
    const UpcomingMoviesList = () => {
        return upcomingMovies.slice(0, 5).map((movie, i) => {

            if (movie.title.length >= 18) {
                movie.title = movie.title.substring(0, 18) + "..."
            }
            if (movie.release_date.length >= 4) {
                movie.release_date = movie.release_date.substring(0, 4)
            }
            return (
                <div className="Mv-main-card w-48 text-start m-2" key={i}>
                    <div className="border-spacing-24">
                        <img
                            className="rounded"
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                    <div className="Mv-title flex items-center h-10 font-bold text-gray-200 text-base ">
                        {movie.title}
                    </div>
                    <div className=" flex">
                        <div className="Mv-rate border-r pr-2 ml-1 text-sm text-gray-200 font-bold">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-500 pr-1" />
                            {movie.vote_average}
                        </div>
                        <div className="Mv-date font-mono text-sm text-gray-500 pl-2">
                            {movie.release_date}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xs mt-1 text-gray-400  ">{movie.genre_ids.slice(0, 3).map(id => genres[id]).join(', ')}{movie.genre_ids.length > 3 ? '...' : ''}

                        </h1>
                    </div>
                </div >
            )
        }
        )
    }
    const TrendingList = () => {
        return trendingList.slice(index, index + 4).map((movie, i) => {

            if (movie.title.length >= 25) {
                movie.title = movie.title.substring(0, 25) + "..."
            }
            if (movie.release_date.length >= 4) {
                movie.release_date = movie.release_date.substring(0, 4)
            }
            return (

                <div>

                    <div
                        className="tr-card cursor-pointer "
                        key={index}
                        onMouseOver={() => handleHover(movie.backdrop_path)}
                        onMouseOut={() => setBackdrop(lastHoveredBackdrop)}
                    >
                        <div className="absolute top-30/100 left-35/100  w-20 ">
                            <FontAwesomeIcon icon={faPlay} className=" text-white" />
                        </div>
                        <div>
                            <img
                                className="rounded w-96 h-full"
                                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                alt={movie.title}
                            />
                        </div>


                    </div>
                    <div className="relative text-center mt-16 cursor-pointer ">
                        <h1 className="text-white text-base p-2 font-semibold">{movie.title}</h1>
                    </div>
                </div>

            )
        }
        )
    }
    const PopularSeriesList = () => {
        return popularSeries.slice(0, 5).map((movie, i) => {


            return (
                <div className="Mv-main-card w-48 text-start m-2" key={i}>
                    <div className="-spacing-24">
                        <img
                            className="rounded"
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.name}
                        />
                    </div>
                    <div className="Mv-name flex items-center h-10 font-bold text-gray-200 text-base ">
                        {movie.name}
                    </div>
                    <div className=" flex">
                        <div className="Mv-rate border-r pr-2 ml-1 text-sm text-gray-200 font-bold">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-500 pr-1" />
                            {movie.vote_average}
                        </div>
                        <div className="Mv-date font-mono text-sm text-gray-500 pl-2">
                            {movie.release_date}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xs mt-1 text-gray-400  ">{movie.genre_ids.slice(0, 3).map(id => genres[id]).join(', ')}{movie.genre_ids.length > 3 ? '...' : ''}

                        </h1>
                    </div>
                </div >
            )
        }
        )
    }
    const TRatedSeriesList = () => {
        return topRatedSeries.slice(0, 5).map((movie, i) => {


            return (
                <div className="Mv-main-card w-48 text-start m-2" key={i}>
                    <div className="-spacing-24">
                        <img
                            className="rounded"
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.name}
                        />
                    </div>
                    <div className="Mv-name flex items-center h-10 font-bold text-gray-200 text-base ">
                        {movie.name}
                    </div>
                    <div className=" flex">
                        <div className="Mv-rate border-r pr-2 ml-1 text-sm text-gray-200 font-bold">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-500 pr-1" />
                            {movie.vote_average}
                        </div>
                        <div className="Mv-date font-mono text-sm text-gray-500 pl-2">
                            {movie.release_date}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xs mt-1 text-gray-400  ">{movie.genre_ids.slice(0, 3).map(id => genres[id]).join(', ')}{movie.genre_ids.length > 3 ? '...' : ''}

                        </h1>
                    </div>
                </div >
            )
        }
        )
    }




    const previous = () => {
        setIndex((prevState) => prevState - 1);

    };

    const next = () => {
        setIndex((prevState) => prevState + 1);
    };

    return (
        <React.Fragment>
            <div className="flex justify-center border">


                <div className="Container">
                    <Navigation />
                    <CarouselPop />

                    <div className="">
                        {/* --------MOVIE--------- */}
                        <div className=" mx-16 my-10 ">
                            <div id="movies">
                                <h1 className="oriname text-start text-3xl font-bold text-gray-200 " >Movies</h1>
                            </div>
                            <div>
                                <div className=" mx-5 my-5">
                                    <div className="ml-5">
                                        <h1 className=" title text-start text-xl font-bold text-gray-200 ">Popular </h1>
                                    </div>
                                    <div className="card mx-5 flex justify-center items-center gap-1 ">
                                        <PopularMoviesList />
                                    </div>
                                </div>

                                <div className=" mx-5 my-5">
                                    <div className="ml-5">
                                        <h1 className="title text-start text-xl font-bold text-gray-200 ">Upcoming </h1>
                                    </div>
                                    <div className="card mx-5 flex justify-center items-center gap-1 ">
                                        <UpcomingMoviesList />
                                    </div>
                                </div>
                            </div>
                            <button className="more">
                                <span>More</span>
                            </button>
                        </div>
                        {/* --------TRENDING--------- */}
                        <div className="trending relative w-full h-96">
                            <div className="trending absolute w-full h-96" style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original/${lastHoveredBackdrop})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "25% 10%",
                                opacity: "0.5",
                                transition: "0.5s ease-in-out"
                            }} />

                            <div className=" mx-20 my-10  ">
                                <div className="relative">
                                    <h1 className="mb-5 text-3xl font-bold text-gray-200 ">Trending</h1>
                                </div>
                                <div className=" mx-5 flex justify-center items-center mt-10">

                                    <button
                                        className={` absolute left-10 text-gray-200 z-10 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${index === 0 ? 'hidden' : 'opacity-100 cursor-pointer'
                                            }`}
                                        onClick={previous}
                                        disabled={index === 0}
                                    >

                                        <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" />
                                    </button>
                                    {index === 0 ? '' : <div class="absolute inset-0 right-95/100 bg-gradient-to-r from-oi to-transparent "></div>}
                                    {/* ---------------------Trending--------------------- */}
                                    <div className="h-40 flex gap-5 ">
                                        <TrendingList />
                                    </div>
                                    {/* ---------------------Trending--------------------- */}
                                    {index === lastIndex ? '' : <div class="absolute inset-0 left-95/100 bg-gradient-to-l from-oi to-transparent "></div>}

                                    <button
                                        className={`absolute right-10 text-gray-200 z-10 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${index === lastIndex ? 'hidden' : 'opacity-100 cursor-pointer'
                                            }`}
                                        onClick={next}
                                        disabled={index === lastIndex}
                                    >
                                        <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6" />
                                    </button>

                                </div>

                            </div>
                        </div>
                        {/* --------SERIES--------- */}
                        <div className=" mx-16 my-20 ">
                            <div id="series">
                                <h1 className="oriTitle text-start text-3xl font-bold text-gray-200 ">Series</h1>
                            </div>
                            <div>
                                <div className=" mx-5 my-5">
                                    <div className="ml-5">
                                        <h1 className=" title text-start text-xl font-bold text-gray-200 ">Popular </h1>
                                    </div>
                                    <div className="card mx-5 flex justify-center items-center gap-1 ">
                                        <PopularSeriesList />
                                    </div>
                                </div>

                                <div className=" mx-5 my-5">
                                    <div className="ml-5">
                                        <h1 className="title text-start text-xl font-bold text-gray-200 ">Top Rated </h1>
                                    </div>
                                    <div className="card mx-5 flex justify-center items-center gap-1 ">
                                        <TRatedSeriesList />
                                    </div>
                                </div>
                            </div>
                            <button className="more">
                                <span>More</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}

export default Home