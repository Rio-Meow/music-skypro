import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from './slices/tracksSlice';
import playerReducer from './slices/playerSlice';
import authReducer from './slices/authSlice';
import favoritesReducer from './slices/favoritesSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    tracks: tracksReducer,
    player: playerReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;