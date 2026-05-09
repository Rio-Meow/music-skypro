import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from './slices/tracksSlice';
import playerReducer from './slices/playerSlice';
import filtersReducer from './slices/filtersSlice';
import authReducer from './slices/authSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    tracks: tracksReducer,
    player: playerReducer,
    filters: filtersReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;