'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface Track {
  _id: number;
  name: string;
  author: string;
  album: string;
  duration_in_seconds: number;
  track_file: string;
  logo: string | null;
}

interface AudioPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playlist: Track[];
  setCurrentTrack: (track: Track | null) => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setPlaylist: (playlist: Track[]) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const useAudioPlayerContext = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayerContext must be used within AudioPlayerProvider');
  }
  return context;
};

export const AudioPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const nextTrack = useCallback(() => {
    if (playlist.length === 0 || !currentTrack) return;
    const currentIdx = playlist.findIndex(t => t._id === currentTrack._id);
    const nextIdx = (currentIdx + 1) % playlist.length;
    setCurrentTrack(playlist[nextIdx]);
    setIsPlaying(true);
  }, [playlist, currentTrack]);

  const prevTrack = useCallback(() => {
    if (playlist.length === 0 || !currentTrack) return;
    const currentIdx = playlist.findIndex(t => t._id === currentTrack._id);
    const prevIdx = (currentIdx - 1 + playlist.length) % playlist.length;
    setCurrentTrack(playlist[prevIdx]);
    setIsPlaying(true);
  }, [playlist, currentTrack]);

  const value = {
    currentTrack,
    isPlaying,
    playlist,
    setCurrentTrack,
    setIsPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    setPlaylist,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};