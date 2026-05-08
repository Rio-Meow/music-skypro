import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllTracks, Track } from '@/api/tracks';

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

export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async () => {
  return await getAllTracks();
});

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
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