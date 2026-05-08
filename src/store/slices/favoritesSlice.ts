import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFavoriteTracks, addToFavorite, removeFromFavorite, Track } from '@/api/tracks';

interface FavoritesState {
  items: Track[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchFavorites = createAsyncThunk(
  'favorites/fetch',
  async (accessToken: string) => {
    return await getFavoriteTracks(accessToken);
  }
);

export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async ({ trackId, accessToken }: { trackId: number; accessToken: string }) => {
    await addToFavorite(trackId, accessToken);
    return trackId;
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async ({ trackId, accessToken }: { trackId: number; accessToken: string }) => {
    await removeFromFavorite(trackId, accessToken);
    return trackId;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.items = [];
      state.status = 'idle';
    },
    toggleFavoriteLocal: (state, action: PayloadAction<Track>) => {
      const track = action.payload;
      const exists = state.items.some(t => t._id === track._id);
      if (exists) {
        state.items = state.items.filter(t => t._id !== track._id);
      } else {
        state.items.push(track);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch favorites';
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      });
  },
});

export const { clearFavorites, toggleFavoriteLocal } = favoritesSlice.actions;
export default favoritesSlice.reducer;