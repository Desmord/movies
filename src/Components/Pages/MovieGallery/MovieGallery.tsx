import { useState } from "react"
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
    const [movies, setMovies] = useState<MoviesType[]>([
        { name: `The Wheel of time`, currentTransition: 0, releaseDate: `2023-20-50` },
        { name: `The last voyage of the dementer`, currentTransition: 0, releaseDate: `2023-20-50` },
        { name: `Happy ending`, currentTransition: 0, releaseDate: `2023-20-50` },
        { name: `The Equalizer`, currentTransition: 0, releaseDate: `2023-20-50`, },
        { name: `Asoka`, currentTransition: 0, releaseDate: `2023-20-50`, },
        { name: `one piece`, currentTransition: 0, releaseDate: `2023-20-50` },
    ])

    const { slide, getMovies, } = UseMovieGallery({
        currentSlide,
        setCurrentSlide,
        movies,
        setMovies
    });

    return (
        <div className="absolute w-full h-full
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
                font-bold z-10
                justify-self-center gap-1 self-end flex bg-slate-200 p-0.5 rounded-3xl
            ">
                <div className={`
                    ${timeSelected === `day` ?
                        `bg-orange-600 rounded-2xl hover:bg-orange-700 cursor-pointer` :
                        `text-slate-400 hover:text-slate-500 cursor-pointer`}
                    p-1 px-3 transition-all
                `}
                    onClick={() => { slide(); setTimeSelected(`day`) }}>
                    Day
                </div>
                <div className={`
                    ${timeSelected === `week` ?
                        `bg-orange-600 rounded-2xl hover:bg-orange-700 cursor-pointer` :
                        `text-slate-400 hover:text-slate-500 cursor-pointer`}
                    p-1 px-3 transition-all
                `}
                    onClick={() => setTimeSelected(`week`)}>
                    Week
                </div>
            </div>
            <div className="
                col-span-2 justify-self-center 
                pt-16 w-full xl:w-9/12 relative
                overflow-hidden
            ">

                <div className={styles.slider}>
                    {getMovies(movies)}
                </div>
            </div>
        </div >
    )
}

export default MovieGallery