import { useState } from "react"

const MovieGallery = ({ text }: { text: string }) => {

    const [timeSelected, setTimeSelected] = useState(`day`)

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
                    onClick={() => setTimeSelected(`day`)}>
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
            <div className="col-span-2 justify-self-center ">movies</div>
        </div >
    )
}

export default MovieGallery