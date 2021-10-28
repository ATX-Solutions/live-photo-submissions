import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { mockFetch } from '../utils/dev';
import { ImageResponse } from '../utils/interfaces';

export const refreshImages = createAsyncThunk('/refreshImages', async (values: any, { rejectWithValue }) => {
    console.log(values);
    try {
        const response = await mockFetch(true, { data: [], status: 200 });
        return response.data;
    } catch (e) {
        // return errorHandler(e, rejectWithValue);
    }
});

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
            // state.results.unshift(payload);
            state.results = [payload, ...state.results].map((p, index) => ({ ...p, groupKey: Math.floor(index / 10) }));
        },
    },
    extraReducers: () => {},
});

export const { resetState, addImage } = images.actions;

export default images.reducer;
