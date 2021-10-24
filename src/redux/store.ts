import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import images from './images';

export const store = configureStore({
    reducer: {
        images,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
