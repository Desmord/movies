import { configureStore } from "@reduxjs/toolkit";

import MoviesReducer from './MoviesSlice';
import AppReducer from "./AppSlice";

const Store = configureStore({
    reducer: {
        movies: MoviesReducer,
        app: AppReducer
    }
});

export default Store;