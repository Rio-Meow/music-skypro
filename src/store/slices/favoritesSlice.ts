import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '@/types/track';

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
  async (accessToken: string, { rejectWithValue }) => {
    if (!accessToken) {
      return rejectWithValue('No access token');
    }
    
    try {
      const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (response.status === 401) {
        return rejectWithValue('Token expired');
      }
      
      if (!response.ok) {
        return rejectWithValue('Failed to fetch favorites');
      }
      
      const data = await response.json();
      return data.data as Track[];
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async ({ trackId, accessToken }: { trackId: number; accessToken: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${trackId}/favorite/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 401) {
        return rejectWithValue('Token expired');
      }
      
      if (!response.ok) {
        return rejectWithValue('Failed to add to favorites');
      }
      
      return trackId;
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async ({ trackId, accessToken }: { trackId: number; accessToken: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${trackId}/favorite/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (response.status === 401) {
        return rejectWithValue('Token expired');
      }
      
      if (!response.ok) {
        return rejectWithValue('Failed to remove from favorites');
      }
      
      return trackId;
    } catch {
      return rejectWithValue('Network error');
    }
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;