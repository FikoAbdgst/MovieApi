import React, { useEffect, useState } from "react";
import { getMovieList, searchMovie } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faBookmark, faUser, faRightFromBracket, faPen, faSearch } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import './navigation.css';
import axios from "axios";


const Navdex = () => {
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
    const [hideMenuBar, setHideMenuBar] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [disableBodyScroll, setDisableBodyScroll] = useState(false);
    const [isSearch, setIsSearch] = useState(false)
    const [hideInputSearch, setHideInputSearch] = useState(false);
    const [isMobile2, setIsMobile2] = useState(window.innerWidth <= 640);
    const [popularMovies, setPopularMovies] = useState(0 || [])
    const [popularMovies2, setPopularMovies2] = useState(0 || [])
    const [hiding, setHiding] = useState(false)
    const [hiding2, setHiding2] = useState(false)
    const [uuid, setUuid] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [url, setUrl] = useState('')
    const [showProfile, setShowProfile] = useState(false)

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (disableBodyScroll) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [disableBodyScroll]);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth > 768) {
            setShowHamburgerMenu(false);
            setHideMenuBar(true);
        }
    };

    useEffect(() => {
        getMovieList().then((result) => {
            setPopularMovies(result)
        })
    }, [])

    useEffect(() => {
        window.addEventListener("resize", handleResize2);
        return () => window.removeEventListener("resize", handleResize2);
    }, []);

    const handleResize2 = () => {
        setIsMobile2(window.innerWidth <= 640);
        if (window.innerWidth > 640) {
            setIsSearch(false);
            setHideInputSearch(true);
            setHiding(false)
            setHiding2(false)
        }
    }

    const MenuBar = () => {
        setShowHamburgerMenu(!showHamburgerMenu);
        setHideMenuBar(false);
        setDisableBodyScroll(!disableBodyScroll);
    };

    const handleAnimationEnd = () => {
        if (hideMenuBar) {
            setShowHamburgerMenu(false);
            setDisableBodyScroll(false);
        }
    };


    const inputSearch = () => {
        setIsSearch(!isSearch)
        setHideInputSearch(false);
    };

    const handleAnimationEnd2 = () => {
        if (hideInputSearch) {
            setIsSearch(false);

        }
    };

    const handleCloseMenu = () => {
        setHideMenuBar(true);
        setDisableBodyScroll(false);
    }

    const handleCloseMenu2 = () => {
        setHideInputSearch(true);
    }

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
                        <div className="w-full h-full bg-gray-600 shadow-xl border-b">

                            <div className="Mv-main-card flex" key={i}>
                                <div className=' h-full' >
                                    <img className='w-32' src={`${base}/${movie.poster_path}`} alt="" />
                                </div>
                                <div className=' p-2 '>

                                    <div className="Mv-title text-xs">{movie.title}</div>
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

    const PopularMoviesList2 = () => {
        return popularMovies2.slice(0, 4).map((movie, i) => {
            if (movie.title.length >= 25) {
                movie.title = movie.title.substring(0, 25) + "..."
            }
            if (movie.release_date.length >= 4) {
                movie.release_date = movie.release_date.substring(0, 4)
            }
            const base = "https://image.tmdb.org/t/p/w200"
            return (
                <>
                    {hiding2 && (
                        <div className="h-1/3 bg-gray-600 shadow-xl">

                            <div className="Mv-main-card flex" key={i}>
                                <div className=' p-2 h-full' >
                                    <img className='w-32' src={`${base}/${movie.poster_path}`} alt="" />
                                </div>
                                <div className=' p-2 '>

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

    const cari = async (q) => {
        const query = await searchMovie(q)
        setPopularMovies(query.results)
    }

    const cari2 = async (q) => {
        const query = await searchMovie(q)
        setPopularMovies2(query.results)
    }




    useEffect(() => {
        if (!localStorage.getItem("login")) {
            alert('user diharapkan untuk login terlebih dahulu')
            window.location.replace("/signin")
        }
        const params = localStorage.getItem("login")
        axios({
            method: "GET",
            url: `http://localhost:7900/auth/${params}`
        }).then((result) => {
            if (result.data) {
                console.log(result.data)
                setEmail(result.data[0].email)
                setUrl(result.data[0].url)
                setName(result.data[0].name)
                setUuid(localStorage.getItem("login"))
            }
        }
        )
    }, [])

    const buttonProfile = () => {
        setShowProfile(!showProfile);
    };
    const handleCloseProfile = () => {
        setShowProfile(!showProfile);
    }

    const logout = () => {
        localStorage.removeItem("login")
        window.location.replace("/")
    }
    const editProfile = () => {
        window.location.replace("/edit")
    }
    const ubahPassword = () => {
        window.location.replace("/password")
    }

    return (
        <div className="Container absolute w-full  z-50  " >
            <div className="relative w-full">
                <nav className="Nav w-full bg-transparent h-16 flex justify-center items-center  ">

                    {
                        isMobile2 && (
                            <div className='absolute top-3 left-70/100 w-8/100  z-50 '>
                                <button className="search hover:bg-slate-500" onClick={inputSearch} >
                                    <FontAwesomeIcon icon={faSearch} className="  text-gray-400 max-md:mx-auto" />
                                </button>
                            </div>

                        )
                    }
                    <div className=" flex  ">
                        {isSearch && (
                            <div className={`animate__animated ${hideInputSearch ? 'animate__slideOutUp' : 'animate__slideInDown'} z-50 absolute  bg-slate-600 w-screen flex items-center h-16`} onAnimationEnd={handleAnimationEnd2}>
                                <div className=" flex w-full">
                                    <input
                                        className="input"
                                        placeholder="Search..."
                                        type="text"
                                        onChange={({ target }) => cari(target.value) && (target.value.length >= 1) ? setHiding(true) : setHiding(false)}
                                        required
                                    />
                                    <button className="reset mr-5" type="reset" onClick={() => handleCloseMenu2(setHiding(false))}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </div>
                            </div>

                        )}
                        {
                            popularMovies.length > 0 && (
                                <div className='movie0 absolute top-20/100 w-full ' >
                                    <PopularMoviesList />
                                </div>
                            )
                        }
                        <div className="Menu-bar ">
                            <div className="flex justify-center items-center h-16 ">
                                {/*BUTTON HAMBURGER MENU */}
                                <button className="hidden max-md:block  mx-auto " onClick={MenuBar}>
                                    <FontAwesomeIcon icon={faBars} className="hamburg text-md px-3 py-4" />
                                </button>
                            </div>

                            {showHamburgerMenu && (
                                <div
                                    className={`animate__animated ${hideMenuBar ? 'animate__slideOutUp' : 'animate__slideInDown'} overflow-hidden z-50  bg-slate-600 absolute top-0 w-full h-screen`}
                                    onAnimationEnd={handleAnimationEnd}
                                >
                                    <ul className="dropdown-menu">
                                        <li>Menu Item 1</li>
                                        <li>Menu Item 2</li>
                                        <li>Menu Item 3</li>
                                    </ul>
                                    <button onClick={handleCloseMenu}>
                                        <FontAwesomeIcon icon={faXmark} className="text-lg p-3" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className=" w-full flex justify-between items-center">
                            <div className="Logo flex px-2 rounded font-extrabold text-lg ml-4  ">
                                <a href="#"><button>Logo</button></a>
                            </div>
                        </div>
                    </div>
                    {/* LINKS 1 */}
                    <div className="flex items-center w-3/4 h-full relative p-5 max-lg:w-3/5">
                        <div className="ml-10 flex gap-10">
                            <div className="relative">
                                <button className="leftnav text-white "><a href="#">Movies</a></button>
                            </div>
                            {/* LINKS 2 */}
                            <div className="relative">
                                <button className="leftnav text-white"><a href="#">Series</a></button>
                            </div>
                        </div>

                        <div className="w-full h-10 relative flex justify-end">
                            {/* Search */}
                            <div className={`Menu-top w-3/4 ${isMobile2 ? "block" : "zoom"}relative z-50  `}>
                                {
                                    !showHamburgerMenu &&
                                    <div className={`container w-full ${isMobile2 ? 'hidden' : 'block'}`}  >


                                        <form className="form ">
                                            <button>
                                                <FontAwesomeIcon icon={faSearch} />
                                            </button>
                                            <input
                                                className="input "
                                                placeholder="Search..."
                                                type="text"
                                                onChange={({ target }) => cari2(target.value) && (target.value.length >= 1) ? setHiding2(true) : setHiding2(false)}
                                                required
                                            />
                                            <button className="reset" type="reset" onClick={() => setHiding2(false)}>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </form>
                                        {
                                            popularMovies2.length > 0 && (
                                                <div className='movie' >
                                                    <PopularMoviesList2 />
                                                </div>
                                            )
                                        }
                                    </div>
                                }
                            </div>
                        </div>

                    </div>

                    <div className="rightSec flex justify-center items-center w-20/100  ">
                        <div className="flex border-l w-full justify-center gap-8  max-lg:gap-4  max-md:ml-5 ">
                            <div className=" rounded-full w-11 h-10 max-md:w-10  max-lg:text-xs max-lg:flex max-lg:justify-center max-lg:items-center ">
                                <a href="/watchlist">
                                    <button className="watchlist w-full rounded-full " >
                                        <FontAwesomeIcon icon={faBookmark} className=" text-gray-400 max-md:mx-auto" />
                                    </button>
                                </a>
                            </div>
                            <div className="  rounded-full w-11 h-10 max-md:w-10  max-lg:text-xs max-lg:flex max-lg:justify-center max-lg:items-center   ">
                                <button className="profile w-full rounded-full " onClick={buttonProfile} >
                                    <img src={url} alt="Preview" className="w-11 h-10 rounded-full " />
                                </button>
                                {showProfile && (
                                    <div className="absolute right-5 top-14 w-60  bg-gray-600 rounded shadow-xl pt-2 pb-3 border">
                                        <div className="absolute top-2 left-full -ml-6">
                                            <button onClick={handleCloseProfile}>
                                                <FontAwesomeIcon icon={faXmark} className="text-gray-100" />
                                            </button>
                                        </div>
                                        <div className="w-full h-full flex flex-col justify-center items-center pt-2">
                                            <div className="flex justify-center items-center w-full mt-2">
                                                <img src={url} alt="Profile" className="w-20 h-20 rounded-full" />
                                            </div>
                                            <p className="text-gray-100 font-medium mt-2">{name}</p>
                                            <p className="text-gray-100 font-light text-sm">{email}</p>
                                            <div className="flex flex-col justify-center items-center w-full mt-4 pt-2 border-t">
                                                <button className=" text-gray-100  w-full pl-5 text-left p-2 hover:bg-gray-500" onClick={() => editProfile()}>
                                                    <FontAwesomeIcon icon={faUser} className="text-gray-100 mr-3" />
                                                    Edit Profile
                                                </button>
                                                <button className=" text-gray-100  w-full pl-5 text-left p-2 hover:bg-gray-500" onClick={() => ubahPassword()}>
                                                    <FontAwesomeIcon icon={faPen} className="text-gray-100 mr-3" />
                                                    Ubah Password
                                                </button>
                                                <button className="text-gray-100  w-full pl-5 text-left p-2 hover:bg-gray-500" onClick={() => logout()}>
                                                    <FontAwesomeIcon icon={faRightFromBracket} className="text-gray-100 mr-3" />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </nav >
            </div>
        </div >
    );
};

export default Navdex;
