import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { SELECTED_PAGES } from '../Utilities/Settings';
import App from '../Components/App/App';

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
        setApp: (state, action: PayloadAction<any>) => {
            state = action.payload
        },
    }
})

export const {
    getApp,
    setApp,
} = AppSlice.actions;

export default AppSlice.reducer;
