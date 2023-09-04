import React, { Suspense, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
    movies,
    setMovies,
}: {
    currentSlide: number,
    setCurrentSlide: Function,
    movies: MoviesType[],
    setMovies: Function,
}) => {

    const navigate = useNavigate();
    const timeRef = useRef<any>(null);

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

    const updateMovies = (newMovies: MoviesType[]) => setMovies(newMovies)

    const slide = () => {

        let wrappers = document.querySelectorAll<HTMLElement>(`.${styles.movie}`)
        let newMovies = [...movies]

        newMovies = updateCurrentTransition(newMovies)
        setCurrentTransitionToBegining(newMovies)
        transformPosition(wrappers, newMovies)
        updateMovies(newMovies)

    }

    const showMovie = (movieName: string) => {
        navigate(`/movie/${movieName}`)
    }


    const getMovies = (movies: MoviesType[]) => {
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

    const startSlide = () => {
        timeRef.current = setTimeout(() => {
            slide()
            startSlide()
        }, 4000)
    }

    useEffect(() => {
        startSlide()
        return () => clearTimeout(timeRef.current)
    })

    return { slide, getMovies, showMovie }

}

export default UseMovieGallery
