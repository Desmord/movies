import { useParams } from 'react-router';
import { Suspense } from 'react';

import Img from './Img';

const Movie = () => {
    const { name } = useParams();

    return (
        <div className='relative w-full grid lg:grid-cols-3 -mt-40 md:mt-0
        col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-3 grid-cols-1 grid-rows-2'>
            <Suspense fallback={<span></span>}>
                <span className='p-2 pt-20 md:p-5 md:pt-20 flex col-span-1 justify-center w-full
                lg:block lg:p-2 lg:pt-40'>
                    <Img src={`/assets/images/stars.jpg`} />
                </span>
            </Suspense>
            <div className='col-span-1 flex flex-col p-10 pt-2 lg:p-10 lg:pt-40 lg:col-span-2'>
                <div className='text-3xl font-bold'>{name}</div>
                <div className='text-sm pt-2 pb-2'>
                    <span>2023-04-03</span>
                    <span className='pl-5'>1h 40m</span>
                </div>
                <div className='pt-2 pb-2 block'>
                    <div className='float-left bg-red-600 text-xs rounded-lg p-1 mr-1 mt-1'>Category 1</div>
                    <div className='float-left bg-red-600 text-xs rounded-lg p-1 mr-1 mt-1'>Category 2</div>
                    <div className='float-left bg-red-600 text-xs rounded-lg p-1 mr-1 mt-1'>Category 3</div>
                </div>
                <div className='pt-4'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Deleniti porro sequi enim tempore. Odio deserunt fugit neque libero.
                    Soluta inventore minima necessitatibus a ab! Possimus illo fuga quibusdam
                    nihil odit beatae provident, quaerat nobis, et architecto a sapiente
                    explicabo enim!
                </div>
                <div className='text-xl pt-2 pb-2'>
                    <span>Rating: </span>
                    <span className='font-bold'> 7.3</span>
                </div>
                <div className='p-1 pl-0'>
                    <span className='text-lg font-bold'>Director: </span>
                    <span className='text-slate-400 text-sm pl-2 pr-2'>Mikołaj Chojnacki</span>
                    <span className='text-slate-400 text-sm pl-2 pr-2'>Mikołaj Chojnacki</span>
                </div>
                <div className='p-1 pl-0'>
                    <span className='text-lg font-bold'>Writers:</span>
                    <span className='text-slate-400 text-sm pl-2 pr-2'>Mikołaj Chojnacki</span>
                    <span className='text-slate-400 text-sm pl-2 pr-2'>Mikołaj Chojnacki</span>
                    <span className='text-slate-400 text-sm pl-2 pr-2'>Mikołaj Chojnacki</span>
                </div>
                <div className='p-1 pl-0'>
                    <span className='text-lg font-bold'>Cast:</span>
                    <span className='text-slate-400 text-sm pl-2 pr-2'>Mikołaj Chojnacki</span>
                    <span className='text-slate-400 text-sm pl-2 pr-2'>Mikołaj Chojnacki</span>
                    <span className='text-slate-400 text-sm pl-2 pr-2'>Mikołaj Chojnacki</span>
                    <span className='text-slate-400 text-sm pl-2 pr-2'>Mikołaj Chojnacki</span>
                    <span className='text-slate-400 text-sm pl-2 pr-2'>Mikołaj Chojnacki</span>
                    <span className='text-slate-400 text-sm pl-2 pr-2'>Mikołaj Chojnacki</span>
                </div>
            </div>
        </div>
    )
}

export default Movie

