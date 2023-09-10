import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Suspense } from 'react';

import Img from './Img';
import Loader from '../../Loader/Loader';

type MovieType = {
    name: string,
    relaseDate: string,
    runtime: number,
    genres: string[],
    overview: string,
    rating: number,
    director: string[],
    writers: string[],
    cast: string[],
    posterPath: string,
}

const Movie = () => {
    const [movie, setMovie] = useState<MovieType | null>(null);
    const [isDataLoaded, setIsDataLoades] = useState(false);
    const { id } = useParams();

    const refreshMovie = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjlhMDIyMGEzNmIwZDY5NmNjMTdmYTZjMTkzMDc4ZiIsInN1YiI6IjY0ZWRmNWM3MDZmOTg0MDBhZTRhY2MyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V64bvbninT41jRifOpdjlTtYPDcggdLdeXheIuhrRUg'
            }
        };

        try {

            const movieDataRaw = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
            const movieData = await movieDataRaw.json();

            const movieCreditsRaw = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options);
            const movieCredits = await movieCreditsRaw.json();
            const allCrew = movieCredits.crew;

            let movieCast: string[] = movieCredits.cast.map((cast: { name: string }) => cast.name).slice(0, 8);
            let writers: string[] = allCrew
                .filter((crew: { job: string }) => crew.job === `Writer` || crew.job === `Screenplay` ? true : false)
                .map((crew: { name: string }) => crew.name)
            let director: string[] = allCrew
                .filter((crew: { job: string }) => crew.job === `Director` ? true : false)
                .map((crew: { name: string }) => crew.name)

            setMovie(prev => ({
                name: movieData.original_title,
                relaseDate: movieData.release_date,
                runtime: movieData.runtime,
                genres: movieData.genres.map((genre: { id: number, name: string }) => genre.name),
                overview: movieData.overview,
                rating: movieData.vote_average,
                director: director,
                writers: writers,
                cast: movieCast,
                posterPath: movieData.poster_path,
            }))

        } catch (err) {
            console.log(err)
        }
    }

    const formatDuration = (time: number): string => {
        const hours = Math.floor(time / 60)
        const minutes = time - (hours * 60)

        return `${hours}h ${minutes}m`
    }

    const getCast = (title: string, cast: string[]) => {
        return (
            <div className='p-1 pl-0'>
                <span className='text-lg font-bold'>{title}: </span>
                {cast.map((cast: string, index: number) =>
                    <span key={index} className='text-slate-400 text-sm pl-2 pr-2'>
                        {cast}
                    </span>)}
            </div>
        )
    }

    useEffect(() => {
        refreshMovie()
    }, [id])

    useEffect(() => {
        if (movie?.posterPath) {
            setIsDataLoades(true)
        }
    }, [movie])

    return isDataLoaded ?
        (
            <Suspense>
                <div className='absolute md:relative w-full h-full 
        grid  grid-cols-1 grid-rows-[320px,1fr]
        col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-3
        lg:grid-cols-3'>
                    <Suspense fallback={<span></span>}>
                        <span className='
                flex justify-center
                p-4 col-span-1 w-full 
                lg:block lg:p-2 lg:pt-40'>
                            <Img src={`https://image.tmdb.org/t/p/w400/${movie?.posterPath}`} />
                        </span>
                    </Suspense>
                    <div className=' 
            col-span-1 flex flex-col
            p-5 sm:p-10 
             lg:p-10 lg:pt-40 lg:col-span-2
            '>
                        <div className='text-3xl font-bold'>{movie?.name}</div>

                        <div className='text-sm pt-2 pb-2'>
                            <span>{movie?.relaseDate}</span>
                            <span className='pl-5'>{formatDuration(movie?.runtime ? movie.runtime : 0)}</span>
                        </div>

                        <div className='pt-2 pb-2 block'>
                            {movie?.genres.map((genre: string, index: number) => (
                                <div key={index} className='float-left bg-red-600 text-xs rounded-lg p-1 mr-1 mt-1'>
                                    {genre}
                                </div>
                            ))}
                        </div>

                        <div className='pt-4'>
                            {movie?.overview}
                        </div>

                        <div className='text-xl pt-2 pb-2'>
                            <span>Rating: </span>
                            <span className='font-bold'> {movie?.rating}</span>
                        </div>

                        {movie?.director ? getCast(`Director`, movie.director) : ``}
                        {movie?.writers ? getCast(`Writers`, movie.writers) : ``}
                        {movie?.cast ? getCast(`Cast`, movie.cast) : ``}

                    </div>
                </div>
            </Suspense>

        ) : <div className='absolute md:relative w-full h-full 
        col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-3
        flex justify-center items-start pt-36 mt-10
       '>
            <Loader />
        </div>
}

export default Movie

