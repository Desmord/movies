import { useState, useRef, useEffect } from "react"
import { useSelector } from 'react-redux';
import UseMovieGallery from "./UseMovieGallery";

import styles from './MovieGallery.module.scss';

type MoviesType = {
    name: string,
    currentTransition: number,
    releaseDate: string,
}

const MovieGallery = ({ text }: { text: string }) => {

    const [timeSelected, setTimeSelected] = useState(`day`);
    const [currentSlide, setCurrentSlide] = useState(0);
    const container = useRef(null)

    const {
        getMovies,
    } = UseMovieGallery({
        currentSlide,
        setCurrentSlide,
        container,
    });

    return (
        <div ref={container} className="absolute w-full h-full
            grid-rows-[1fr,3fr] 
            md:relative grid grid-cols-2
            col-span-1  md:col-span-4 lg:col-span-2 xl:col-span-3
        ">
            <div className="
                justify-self-center self-end text-3xl font-bold
            ">
                {text}
            </div>
            <div className="
                col-span-2 justify-self-center 
                pt-16 w-full xl:w-9/12 relative
                overflow-hidden
            ">

                <div className={styles.slider}>
                    {getMovies()}
                </div>
            </div>
        </div >
    )
}

export default MovieGallery