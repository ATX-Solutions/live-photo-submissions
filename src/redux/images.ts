import { createSlice } from '@reduxjs/toolkit';

import { ImageResponse } from '../utils/interfaces';

const initialState: { results: ImageResponse[]; loading: boolean } = {
    results: [],
    loading: false,
};

const images = createSlice({
    name: 'images',
    initialState,
    reducers: {
        resetState: () => initialState,
        addImage: (state, { payload }) => {
            state.results = [payload, ...state.results].map((p, index) => ({
                ...p,
                groupKey: Math.floor(index / 10),
            }));
        },
    },
    extraReducers: () => {},
});

export const { resetState, addImage } = images.actions;

export default images.reducer;
