import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from './tracksSlice';

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  isRepeat: boolean;
  isShuffle: boolean;
  playlist: Track[];
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  isRepeat: false,
  isShuffle: false,
  playlist: [],
  currentTime: 0,
  duration: 0,
  volume: 0.5,
  isMuted: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track | null>) => {
      state.currentTrack = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setIsRepeat: (state, action: PayloadAction<boolean>) => {
      state.isRepeat = action.payload;
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<Track[]>) => {
      state.playlist = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setIsMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
    nextTrack: (state) => {
      if (state.playlist.length === 0 || !state.currentTrack) return;
      const currentIndex = state.playlist.findIndex(t => t._id === state.currentTrack?._id);
      let nextIndex: number;
      if (state.isShuffle) {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * state.playlist.length);
        } while (newIndex === currentIndex && state.playlist.length > 1);
        nextIndex = newIndex;
      } else {
        nextIndex = (currentIndex + 1) % state.playlist.length;
      }
      state.currentTrack = state.playlist[nextIndex];
      state.isPlaying = true;
    },
    prevTrack: (state) => {
      if (state.playlist.length === 0 || !state.currentTrack) return;
      const currentIndex = state.playlist.findIndex(t => t._id === state.currentTrack?._id);
      const prevIndex = (currentIndex - 1 + state.playlist.length) % state.playlist.length;
      state.currentTrack = state.playlist[prevIndex];
      state.isPlaying = true;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  togglePlay,
  setIsRepeat,
  setIsShuffle,
  setPlaylist,
  setCurrentTime,
  setDuration,
  setVolume,
  setIsMuted,
  nextTrack,
  prevTrack,
} = playerSlice.actions;

export default playerSlice.reducer;