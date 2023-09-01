import { useState, useEffect } from "react"

import styles from './MovieGallery.module.scss';

const MovieGallery = ({ text }: { text: string }) => {

    const [timeSelected, setTimeSelected] = useState(`day`);
    const [currentSlide, setCurrentSlide] = useState(0)
    const [movies, setMovies] = useState([
        { name: `1`, currentTransition: 0 },
        { name: `2`, currentTransition: 0 },
        { name: `3`, currentTransition: 0 },
        { name: `4`, currentTransition: 0 },
        { name: `5`, currentTransition: 0 },
        { name: `6`, currentTransition: 0 },
    ])

    const slide = () => {

        let ele = document.querySelectorAll<HTMLElement>(`.${styles.movie}`)

        // tutaj w zaleznosci od rozdzielczosci
        let newMovies = [...movies]


        newMovies = newMovies.map((movie) => {
            return { ...movie, currentTransition: movie.currentTransition - 100 }
        })

        switch (currentSlide) {
            case 0:
                newMovies[currentSlide].currentTransition = 500;
                break;
            case 1:
                newMovies[currentSlide].currentTransition = 400;
                break;
            case 2:
                newMovies[currentSlide].currentTransition = 300;
                break;
            case 3:
                newMovies[currentSlide].currentTransition = 200;
                break;
            case 4:
                newMovies[currentSlide].currentTransition = 100;
                break;
            case 5:
                newMovies[currentSlide].currentTransition = 0;
                break;
            default:
                newMovies[currentSlide].currentTransition = 100;
                break;
        }

        ele[currentSlide].classList.remove(styles.movie)

        console.log(ele[currentSlide])

        newMovies.forEach((movie, index) => {
            if (ele[index]) {
                ele[index].style.transform = `translateX(${movie.currentTransition}%)`
            }
        })

        setTimeout(() => {
            ele[currentSlide].classList.add(styles.movie)

            if (currentSlide === 5) {
                setCurrentSlide(0)
            } else {
                setCurrentSlide(prev => prev + 1)
            }

        }, 500)

        setMovies(newMovies)

    }

    const getDivs = (movies: any) => {
        return (
            <>
                {movies.map((ele: any, index: number) => {
                    return (
                        <div key={index} className={`${styles.movie}`}>{ele.name}</div>
                    )
                })}
            </>
        )
    }

    useEffect(() => {
        // console.log(`----------------`)
        // console.log(movies)
    }, [movies])


    return (
        <div className="absolute w-full h-full
            grid-rows-[1fr,2fr] 
            md:relative grid grid-cols-2
            col-span-1  md:col-span-4 lg:col-span-2 xl:col-span-3
        ">
            <div className="
                justify-self-center self-end text-3xl font-bold
            ">
                {text}
            </div>
            <div className="
                font-bold
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
                pt-8 w-full xl:w-9/12 relative
                bg-orange-300 bg-opacity-10
                
            ">

                <div className={styles.slider}>
                    {getDivs(movies)}
                </div>
            </div>
        </div >
    )
}

export default MovieGallery