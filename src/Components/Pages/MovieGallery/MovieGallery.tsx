import { useState, useRef } from "react"
import UseMovieGallery from "./UseMovieGallery";

import Loader from "../../Loader/Loader";

import styles from './MovieGallery.module.scss';

const MovieGallery = ({ text }: { text: string }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const container = useRef(null)

    const {
        isDataLoaded,
        getMovies,
    } = UseMovieGallery({
        currentSlide,
        setCurrentSlide,
        container,
    });


    return isDataLoaded ? (
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

                <div className={`${styles.slider}
                p-10 sm:p-0
                h-[500px] sm:h-[450px] md:h-[300px] lg:h-[450px]
                `}>
                    {getMovies()}
                </div>
            </div>
        </div >

    ) : <div className='absolute md:relative w-full h-full 
    col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-3
    flex justify-center items-start pt-36 mt-10
   '>
        <Loader />
    </div>
}

export default MovieGallery