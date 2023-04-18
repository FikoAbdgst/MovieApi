import React, { useState, useEffect } from "react";
import { getNPlayMovieList } from "../../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronLeft, faChevronRight, faStar, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faPlayCircle, } from '@fortawesome/free-regular-svg-icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'animate.css';
import './navigation.css'
import axios from "axios";

const CarouselPop = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [showDesc, setShowDesc] = useState(false);
    const [hideDesc, setHideDesc] = useState(false);
    const [hideLeft, setHideLeft] = useState(false);
    const [hideRight, setHideRight] = useState(false);
    const [genres, setGenres] = useState({});

    useEffect(() => {
        getNPlayMovieList().then((result) => {
            setPopularMovies(result);
        });

        const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_APIKEY}`;

        axios.get(GENRE_URL).then((response) => {
            const genreMap = {};
            response.data.genres.forEach((genre) => {
                genreMap[genre.id] = genre.name;
            });
            setGenres(genreMap);
        });
    }, []);



    // Komponen PrevArrow
    const PrevArrow = (props) => {
        const { className, onClick } = props;
        return (
            <button
                className={className}
                onClick={onClick}
                aria-label="Previous"
                type="button"
            >
                <i className="fas fa-chevron-left"></i>
            </button>
        );
    };

    // Komponen NextArrow
    const NextArrow = (props) => {
        const { className, onClick } = props;
        return (
            <button
                className={className}
                onClick={onClick}
                aria-label="Next"
                type="button"
            >
                <i className="fas fa-chevron-right"></i>
            </button>
        );
    };

    const settings = {
        dots: true,
        dotsClass: 'custom-dots', // Menambahkan properti dotsClass dan memberikan nama kelas "custom-dots"
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true, // Menambahkan properti pauseOnHover agar slider berhenti slide ketika cursor di atasnya
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ], // Menambahkan properti responsive agar slider menyesuaikan ukuran layar
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };


    const descBar = () => {
        setShowDesc(!showDesc);
        setHideDesc(false)
        setHideLeft(true)
        setHideRight(false)
    };
    const handleAnimationEnd = () => {
        if (hideDesc) {
            setShowDesc(false);
        }
    };
    const handleCloseMenu = () => {
        setHideDesc(true);
        setHideLeft(false)
        setHideRight(true)
    }



    return (
        <div className=" mx-auto w-full ">
            <Slider {...settings} >
                {popularMovies.slice(0, 5).map((movie, i) => {
                    if (movie.release_date.length >= 4) {
                        movie.release_date = movie.release_date.substring(0, 4)
                    }
                    return (
                        <React.Fragment>
                            <div key={i} class="absolute inset-0 opacity-20 bottom-90/100 bg-gradient-to-t from-transparent to-oi z-50 "></div>
                            <div className=" h-150 max-lg:h-115 max-md:h-110" >
                                <div className={`awal  animate__animated ${hideLeft ? 'animate__fadeOut hidden' : 'animate__fadeIn block'} flex absolute w-screen h-15/100 top-80/100 max-md:top-1/2 z-20 `} onAnimationEnd={handleAnimationEnd}>
                                    <div className="flex">
                                        <div className="">
                                            <h1 className=" ml-12 max-md:mt-32 max-lg:mt-36 text-4xl font-semibold text-white  ">{movie.title}</h1>
                                            <div className=" px-4 ml-12 mt-3  flex ">
                                                <h1 className="text-gray-200 font-extrabold border-r pr-3">
                                                    <FontAwesomeIcon icon={faStar} className="text-yellow-500 pr-1" />
                                                    {movie.vote_average}
                                                </h1>
                                                <h1 className="text-gray-400 ml-3 "> {movie.genre_ids.map(id => genres[id]).join(', ')}</h1>
                                            </div>
                                        </div>
                                        <div className=" mt-5 ml-5">
                                            <button className="mt-1 relative flex justify-center items-center text-gray-400 hover:text-red-600 " >
                                                <FontAwesomeIcon icon={faBookmark} className="text-4xl  max-md:mx-auto relative z-10 " />
                                                <FontAwesomeIcon icon={faPlus} className="text-sm  mb-1 max-md:mx-auto absolute z-40  " />
                                            </button>
                                        </div>
                                    </div>


                                    <div className="ml-150 ">
                                        <div className="">
                                            <button className="relative flex justify-center items-center text-gray-400 hover:text-red-600 " >
                                                <FontAwesomeIcon icon={faPlayCircle} className="text-7xl  max-md:mx-auto relative z-10 " />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <img
                                        className=" w-full h-150 max-lg:h-96 max-md"
                                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                        alt={movie.title}
                                    />
                                    <div class="absolute inset-0 top-60/100 bg-gradient-to-b from-transparent to-oi"></div>

                                    <div className={` animate__animated ${hideLeft ? 'animate__fadeOutRight' : 'animate__fadeInRight'} absolute top-1/2 w-full z-40 `} >
                                        <button className={`desc flex justify-center items-center absolute right-8/100`} onClick={descBar}>
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </button>
                                    </div>
                                    {showDesc && (
                                        <div className={` z-50  bg-transparent absolute top-0  w-full  h-full`} onAnimationEnd={handleAnimationEnd}>

                                            <div class={`animate__animated ${hideDesc ? 'animate__fadeOutRight' : 'animate__fadeInRight'}  absolute inset-0 left-40/100 bg-gradient-to-r from-transparent via-oi to-oi w-3/5`}>
                                                <div className="w-full h-full ">
                                                    <div className="w-1/2 h-80/100  absolute right-0 top-15/100  ">
                                                        <div className="">
                                                            <h1 className="text-gray-200 text-2xl p-2 font-semibold">{movie.title}</h1>
                                                        </div>
                                                        <div className="flex mt-2 text-sm  ">
                                                            <div className=" px-4  flex ">
                                                                <h1 className="text-gray-200 font-extrabold pr-3">
                                                                    <FontAwesomeIcon icon={faStar} className="text-yellow-500 pr-1" />
                                                                    {movie.vote_average}
                                                                </h1>
                                                                <h1 className="text-gray-500 font-bold pr-2">{movie.vote_count} Reviews</h1>
                                                                <h1 className="text-gray-500 font-bold ">{movie.release_date}</h1>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs px-4 py-2 ">
                                                            <h1 className="text-gray-200 "> {movie.genre_ids.map(id => genres[id]).join(', ')}</h1>
                                                        </div>
                                                        <div className="mt-5 ">
                                                            <p className="text-gray-200">"{movie.overview}"</p>
                                                        </div>
                                                        <div className=" mt-10 flex justify-center items-center " >
                                                            <div className="w-85/100  flex justify-between">
                                                                <button className="playRight"> <FontAwesomeIcon icon={faPlay} className="pr-1" />  Watch Trailer </button>
                                                                <button className="playRight"> <FontAwesomeIcon icon={faPlus} className="pr-1" />  Add To List </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`animate__animated ${hideRight ? 'animate__fadeOutRight' : 'animate__fadeInRight'} absolute top-1/2 w-full left-0 z-40 `} >
                                                <button className="desc flex justify-center items-center absolute right-40/100" onClick={() => handleCloseMenu(setHideDesc(false))}>
                                                    <FontAwesomeIcon icon={faChevronRight} />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </React.Fragment>
                    )
                })}
            </Slider>
        </div >
    );
};

export default CarouselPop;
