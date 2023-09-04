import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SELECTED_PAGES } from "../../Utilities/Settings";
import { BiSolidCameraMovie } from 'react-icons/bi';
import { LuMenu } from 'react-icons/lu';
import { setApp } from "../../Redux/AppSlice";
import { useState } from 'react'

const Menu = () => {

    const { selectedPage } = useSelector((state: any) => state.app);
    const dispatch = useDispatch();

    const [menuDisplay, setMenuDisplay] = useState(true);

    return (
        <div className={`
            flex flex-col col-span-1 w-full justify-self-end justify-start items-center p-20
            md:justify-self-end md:justify-start md:items-end
            md:col-span-3 lg:col-span-1 xl:col-span-1 h-full         
            ${menuDisplay ? `` : `bg-slate-900 bg-opacity-80 md:bg-transparent  transition-all z-20`}
            `}>
            <div className="hidden md:flex gap-3 text-slate-200 text-4xl font-bold tracking-wider">
                <BiSolidCameraMovie />
                Movies
            </div>
            <LuMenu className={`
            absolute top-5 right-5 block md:hidden text-slate-200 text-4xl
            transition-all hover:scale-110 hover:cursor-pointer transition-all z-20
            `}
                onClick={() => setMenuDisplay((prev: boolean) => !prev)} />
            <div className={`${menuDisplay ? `absolute top-0 -translate-y-full` : `translate-y-0`} 
                 pt-20 flex flex-col gap-5 text-xl text-center
                  md:text-right md:relative md:translate-y-0
                   tracking-wide  transition-all`}>
                <Link to="/" className={`relative transition-all hover:scale-110 hover:cursor-pointer
                                ${selectedPage === SELECTED_PAGES.TRENDING ? `` : `text-slate-300/50`}`}
                    onClick={() => {
                        setMenuDisplay((prev: boolean) => true)
                        dispatch(setApp(SELECTED_PAGES.TRENDING))
                    }} >
                    Trending
                </Link>
                <Link to="/popular" className={`relative transition-all hover:scale-110 hover:cursor-pointer
                                ${selectedPage === SELECTED_PAGES.POPULAR ? `` : `text-slate-300/50`}`}
                    onClick={() => {
                        setMenuDisplay((prev: boolean) => true)
                        dispatch(setApp(SELECTED_PAGES.POPULAR))
                    }}>
                    Popular
                </Link>
                <Link to="/toprated" className={`relative transition-all hover:scale-110 hover:cursor-pointer
                                ${selectedPage === SELECTED_PAGES.TOP_RATED ? `` : `text-slate-300/50`}`}
                    onClick={() => {
                        setMenuDisplay((prev: boolean) => true)
                        dispatch(setApp(SELECTED_PAGES.TOP_RATED))
                    }}>
                    Top Rated
                </Link>
                <Link to="/upcoming" className={`relative transition-all hover:scale-110 hover:cursor-pointer
                                ${selectedPage === SELECTED_PAGES.UPCOMING ? `` : `text-slate-300/50`}`}
                    onClick={() => {
                        setMenuDisplay((prev: boolean) => true)
                        dispatch(setApp(SELECTED_PAGES.UPCOMING))
                    }}>
                    Upcoming
                </Link>
            </div>

        </div >
    )
}

export default Menu