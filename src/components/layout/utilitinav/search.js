import '../navigation.css'
import 'animate.css';
import React, { useState, useEffect } from "react";
import { getMovieList, searchMovie } from '../../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';

const Search = () => {

    const [popularMovies, setPopularMovies] = useState(0 || [])
    const [hiding, setHiding] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    useEffect(() => {
        getMovieList().then((result) => {
            setPopularMovies(result)
        })
    }, [])

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 640);
    };


    const PopularMoviesList = () => {
        return popularMovies.slice(0, 4).map((movie, i) => {
            if (movie.title.length >= 25) {
                movie.title = movie.title.substring(0, 25) + "..."
            }
            if (movie.release_date.length >= 4) {
                movie.release_date = movie.release_date.substring(0, 4)
            }
            const base = "https://image.tmdb.org/t/p/w200"
            return (
                <>
                    {hiding && (
                        <div className="h-1/3 bg-gray-600 shadow-xl">

                            <div className="Mv-main-card flex" key={i}>
                                <div className='border p-2 h-full' >
                                    <img className='w-32' src={`${base}/${movie.poster_path}`} alt="" />
                                </div>
                                <div className='border p-2 '>

                                    <div className="Mv-title">{movie.title}</div>
                                    <div className="Mv-rate">
                                        {movie.vote_average}
                                    </div>

                                    <div className='card-body'>

                                        <div className="Mv-date">
                                            {movie.release_date}
                                        </div>

                                    </div>

                                </div>
                            </div >
                        </div>
                    )

                    }
                </>
            )
        }
        )
    }



    const search = async (q) => {
        const query = await searchMovie(q)
        setPopularMovies(query.results)
    }




    return (
        <React.Fragment>
            <div>
                <div className={`container w-full ${isMobile ? 'hidden' : 'block'}`}  >


                    <form className="form ">
                        <button>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        <input
                            className="input"
                            placeholder="Search..."
                            type="text"
                            onChange={({ target }) => search(target.value) && (target.value.length >= 1) ? setHiding(true) : setHiding(false)}
                            required
                        />
                        <button className="reset" type="reset" onClick={() => setHiding(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </form>
                    {
                        popularMovies.length > 0 && (
                            <div className='movie ' >
                                <PopularMoviesList />
                            </div>
                        )
                    }
                </div>
            </div>

        </React.Fragment>


    );
}

export default Search;
