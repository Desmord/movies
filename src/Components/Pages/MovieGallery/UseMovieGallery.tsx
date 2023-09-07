import {
    Suspense,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    setTrending,
    setPopular,
    setTopRated,
    setUpComing,
} from '../../../Redux/MoviesSlice';
import Img from './Img';

import styles from './MovieGallery.module.scss';

type MoviesType = {
    name: string,
    currentTransition: number,
    releaseDate: string,
}

const UseMovieGallery = ({
    currentSlide,
    setCurrentSlide,
    container,
}: {
    currentSlide: number,
    setCurrentSlide: Function,
    container: any,
}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const timeRef = useRef<any>(null);
    const appMovies = useSelector((state: any) => state.movies)
    const [movies, setMovies] = useState<MoviesType[]>([])

    const updateCurrentTransition = (moviesToupdate: MoviesType[]) => {
        return moviesToupdate.map((movie) => {
            return { ...movie, currentTransition: movie.currentTransition - 100 }
        })
    }

    const setCurrentTransitionToBegining = (moviesToupdate: MoviesType[]) => {

        switch (currentSlide) {
            case 0:
                moviesToupdate[currentSlide].currentTransition = 500;
                break;
            case 1:
                moviesToupdate[currentSlide].currentTransition = 400;
                break;
            case 2:
                moviesToupdate[currentSlide].currentTransition = 300;
                break;
            case 3:
                moviesToupdate[currentSlide].currentTransition = 200;
                break;
            case 4:
                moviesToupdate[currentSlide].currentTransition = 100;
                break;
            case 5:
                moviesToupdate[currentSlide].currentTransition = 0;
                break;
            default:
                moviesToupdate[currentSlide].currentTransition = 100;
                break;
        }
    }

    const transformPosition = (elements: NodeListOf<HTMLElement>, moviesToUpdate: MoviesType[]) => {
        elements[currentSlide].classList.remove(styles.movie)

        moviesToUpdate.forEach((movie, index) => {
            if (elements[index]) {
                elements[index].style.transform = `translateX(${movie.currentTransition}%)`
            }
        })

        setTimeout(() => {
            elements[currentSlide].classList.add(styles.movie)

            if (currentSlide === 5) {
                setCurrentSlide(0)
            } else {
                setCurrentSlide((prev: number) => prev + 1)
            }

        }, 500)

    }

    const slide = () => {

        let wrappers = document.querySelectorAll<HTMLElement>(`.${styles.movie}`)
        let newMovies = [...movies] as any[]

        newMovies = updateCurrentTransition(newMovies)
        setCurrentTransitionToBegining(newMovies)
        transformPosition(wrappers, newMovies)
        setMovies(newMovies)

    }

    const showMovie = (movieName: string) => {
        container.current.classList.add(`${styles.hideContainer}`)
        setTimeout(() => {
            navigate(`/movie/${movieName}`)
        }, 600)
    }


    const getMovies = () => {

        return (
            <>
                {
                    movies.map((ele: MoviesType, index: number) => {

                        return (
                            <div
                                key={index}
                                className={`${styles.movie}`}
                                onClick={() => showMovie(ele.name)} >
                                <Suspense fallback={<span></span>}>
                                    <Img src={`./assets/images/stars.jpg`} />
                                    <div className={styles.data}>
                                        <div>{ele.name}</div>
                                        <div>{ele.releaseDate}</div>
                                    </div>
                                </Suspense>
                            </div >
                        )
                    })
                }
            </>
        )
    }

    const isMoviesEmpty = (movies: any) => {
        if (movies.length) {
            return true
        } else {
            return false
        }
    }


    const download = async () => {

        if (!isMoviesEmpty(appMovies.trending)) {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjlhMDIyMGEzNmIwZDY5NmNjMTdmYTZjMTkzMDc4ZiIsInN1YiI6IjY0ZWRmNWM3MDZmOTg0MDBhZTRhY2MyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V64bvbninT41jRifOpdjlTtYPDcggdLdeXheIuhrRUg'
                }
            };

            try {

                const trendingRaw = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
                const popularRaw = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
                const topRatedRaw = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
                const upcomingRaw = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options);

                const trending = await trendingRaw.json();
                const popular = await popularRaw.json();
                const topRated = await topRatedRaw.json();
                const upcoming = await upcomingRaw.json();

                dispatch(setTrending(trending.results.slice(0, 6)));
                dispatch(setPopular(popular.results.slice(0, 6)));
                dispatch(setTopRated(topRated.results.slice(0, 6)));
                dispatch(setUpComing(upcoming.results.slice(0, 7)));


            } catch (err) {
                console.log(err)
            }

        }

    }

    const startSlide = () => {
        timeRef.current = setTimeout(() => {
            slide()
            startSlide()
        }, 4000)
    }

    useEffect(() => {
        download()
    }, [])

    useEffect(() => {
        startSlide()
        return () => clearTimeout(timeRef.current)
    })

    useEffect(() => {
        let objectToSave = appMovies.trending;
        objectToSave = objectToSave.map((obj: any) => ({
            currentTransition: 0,
            name: obj.original_title,
            releaseDate: obj.release_date,
        }))
        setMovies(objectToSave)
    }, [appMovies])


    //  w zaleznosci od zaznaczonej wartosci odswierzamy odpowiednie filmy do setMOvies
    //          albo przeniesc currentDisplay do contekstu zeby bylo dla całej app

    return {
        getMovies,
        showMovie
    }

}

export default UseMovieGallery
