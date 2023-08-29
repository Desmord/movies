import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';


export type InitialStateType = {
    trending: any[],
    popular: any[],
    topRated: any[],
    upComing: any[],
    selectedMovie: {},
}

const initialState: InitialStateType = {
    trending: [],
    popular: [],
    topRated: [],
    upComing: [],
    selectedMovie: {},
}

const MoviesSlice = createSlice({
    name: `movies`,
    initialState,
    reducers: {
        getMovies: (state) => { return state },
        setMovies: (state, action: PayloadAction<any>) => {
            state = action.payload
        },
        setTrending: (state, action: PayloadAction<any>) => {
            state.trending = action.payload
        },
        setPopular: (state, action: PayloadAction<any>) => {
            state.popular = action.payload
        },
        setTopRated: (state, action: PayloadAction<any>) => {
            state.topRated = action.payload
        },
        setUpComing: (state, action: PayloadAction<any>) => {
            state.upComing = action.payload
        },
        setSelectedMovie: (state, action: PayloadAction<any>) => {
            state.selectedMovie = action.payload
        },
    }
})

export const {
    getMovies,
    setMovies,
    setTrending,
    setPopular,
    setTopRated,
    setUpComing,
    setSelectedMovie,
} = MoviesSlice.actions;

export default MoviesSlice.reducer;