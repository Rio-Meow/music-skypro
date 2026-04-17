import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Track {
  _id: number;
  name: string;
  author: string;
  album: string;
  duration_in_seconds: number;
  track_file: string;
  logo: string | null;
  genre: string[];
  release_date: string;
  stared_user: any[];
}

interface TracksState {
  items: Track[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TracksState = {
  items: [],
  status: 'idle',
  error: null,
};

// Асинхронный thunk для получения треков из API
export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async () => {
  const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/');
  const data = await response.json();
  return data.data;
});

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTracks.fulfilled, (state, action: PayloadAction<Track[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tracks';
      });
  },
});

export default tracksSlice.reducer;