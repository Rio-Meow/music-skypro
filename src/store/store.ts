import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from './slices/tracksSlice';
import playerReducer from './slices/playerSlice';
import filtersReducer from './slices/filtersSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    tracks: tracksReducer,
    player: playerReducer,
    filters: filtersReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;