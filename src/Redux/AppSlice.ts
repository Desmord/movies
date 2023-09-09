import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { SELECTED_PAGES } from '../Utilities/Settings';

export type InitialStateType = {
    selectedPage: string,
}

const initialState: InitialStateType = {
    selectedPage: SELECTED_PAGES.TRENDING
}

const AppSlice = createSlice({
    name: `appF`,
    initialState,
    reducers: {
        getApp: (state) => { return state },
        setAppSelectedPage: (state, action: PayloadAction<any>) => {
            state.selectedPage = action.payload
        },
    }
})

export const {
    getApp,
    setAppSelectedPage,
} = AppSlice.actions;

export default AppSlice.reducer;
