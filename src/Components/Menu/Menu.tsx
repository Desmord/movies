import { useSelector, useDispatch } from "react-redux"
import { SELECTED_PAGES } from "../../Utilities/Settings";
import { BiSolidCameraMovie } from 'react-icons/bi';
import { LuMenu } from 'react-icons/lu';
import { setApp } from "../../Redux/AppSlice";
import { useState } from 'react'

const Menu = () => {

    const { selectedPage } = useSelector((state: any) => state.app);
    const dispatch = useDispatch();

    const [menuDisplay, setMenuDisplay] = useState(false);

    return (
        <div className={`
            flex flex-col col-span-1 w-full justify-self-end justify-start items-center p-20
            sm:justify-self-end sm:justify-start sm:items-end
            md:col-span-3 lg:col-span-1 xl:col-span-1 
            transition-all
            ${menuDisplay ? `` : `bg-slate-900 bg-opacity-80 sm:bg-transparent`}
            `}>
            <div className="hidden sm:flex gap-3 text-slate-200 text-4xl font-bold tracking-wider">
                <BiSolidCameraMovie />
                Movies
            </div>
            <LuMenu className={`
            absolute top-5 right-5 block sm:hidden text-slate-200 text-4xl
            transition-all hover:scale-110 hover:cursor-pointer
            `}
                onClick={() => setMenuDisplay((prev: boolean) => !prev)} />
            <div className={`${menuDisplay ? `absolute top-0 -translate-y-full` : `translate-y-0`} 
                 pt-20 flex flex-col gap-5 text-xl text-center
                  sm:text-right sm:relative sm:translate-y-0
                   tracking-wide  transition-all`}>
                <div className={`relative transition-all hover:scale-110 hover:cursor-pointer
                                ${selectedPage === SELECTED_PAGES.TRENDING ? `` : `text-slate-300/50`}`}
                    onClick={() => dispatch(setApp(SELECTED_PAGES.TRENDING))}>
                    Trending
                </div>
                <div className={`relative transition-all hover:scale-110 hover:cursor-pointer
                                ${selectedPage === SELECTED_PAGES.POPULAR ? `` : `text-slate-300/50`}`}
                    onClick={() => dispatch(setApp(SELECTED_PAGES.POPULAR))}>
                    Popular
                </div>
                <div className={`relative transition-all hover:scale-110 hover:cursor-pointer
                                ${selectedPage === SELECTED_PAGES.TOP_RATED ? `` : `text-slate-300/50`}`}
                    onClick={() => dispatch(setApp(SELECTED_PAGES.TOP_RATED))}>
                    Top Rated
                </div>
                <div className={`relative transition-all hover:scale-110 hover:cursor-pointer
                                ${selectedPage === SELECTED_PAGES.UPCOMING ? `` : `text-slate-300/50`}`}
                    onClick={() => dispatch(setApp(SELECTED_PAGES.UPCOMING))}>
                    Upcoming
                </div>
            </div>

        </div >
    )
}

export default Menu