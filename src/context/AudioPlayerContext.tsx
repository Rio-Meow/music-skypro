'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { data } from '@/data';

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
  isRepeat: boolean;
  isShuffle: boolean;
  playlist: Track[];
  setCurrentTrack: (track: Track | null) => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setIsRepeat: (repeat: boolean) => void;
  setIsShuffle: (shuffle: boolean) => void;
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
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  
  const playlistRef = useRef<Track[]>([]);
  const currentTrackRef = useRef<Track | null>(null);

  useEffect(() => {
    playlistRef.current = data;
    setPlaylist(data);
    if (data.length > 0) {
      currentTrackRef.current = data[0];
      setCurrentTrack(data[0]);
    }
  }, []);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  useEffect(() => {
    playlistRef.current = playlist;
  }, [playlist]);

  const nextTrack = useCallback(() => {
    const currentPlaylist = playlistRef.current;
    const current = currentTrackRef.current;
    
    if (currentPlaylist.length === 0 || !current) return;
    
    const currentIndex = currentPlaylist.findIndex(t => t._id === current._id);
    let nextIndex;
    
    if (isShuffle) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * currentPlaylist.length);
      } while (newIndex === currentIndex && currentPlaylist.length > 1);
      nextIndex = newIndex;
    } else {
      nextIndex = (currentIndex + 1) % currentPlaylist.length;
    }
    
    setCurrentTrack(currentPlaylist[nextIndex]);
    setIsPlaying(true);
  }, [isShuffle]);

  const prevTrack = useCallback(() => {
    const currentPlaylist = playlistRef.current;
    const current = currentTrackRef.current;
    
    if (currentPlaylist.length === 0 || !current) return;
    
    const currentIndex = currentPlaylist.findIndex(t => t._id === current._id);
    const prevIndex = (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    
    setCurrentTrack(currentPlaylist[prevIndex]);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const value = {
    currentTrack,
    isPlaying,
    isRepeat,
    isShuffle,
    playlist,
    setCurrentTrack,
    setIsPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    setIsRepeat,
    setIsShuffle,
    setPlaylist,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};