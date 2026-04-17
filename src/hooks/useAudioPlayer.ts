import { useRef, useState, useEffect } from 'react';

interface UseAudioPlayerProps {
  src: string | null;
  onEnded?: () => void;
}

export const useAudioPlayer = ({ src, onEnded }: UseAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
      
      const handleTimeUpdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };
      
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
          setIsLoading(false);
        }
      };
      
      const handleEnded = () => {
        console.log('Audio ended, calling onEnded');
        if (onEnded) onEnded();
      };
      
      const handleWaiting = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);
      
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('waiting', handleWaiting);
      audioRef.current.addEventListener('canplay', handleCanPlay);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('waiting', handleWaiting);
          audioRef.current.removeEventListener('canplay', handleCanPlay);
          audioRef.current.pause();
          audioRef.current.src = '';
        }
      };
    }
  }, []);

  useEffect(() => {
    if (audioRef.current && src) {
      console.log('Loading src:', src);
      setIsLoading(true);
      audioRef.current.src = src;
      audioRef.current.load();
    }
  }, [src]);

  const play = () => {
    if (audioRef.current && src) {
      console.log('Play called');
      audioRef.current.play().catch(console.error);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      console.log('Pause called');
      audioRef.current.pause();
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeVolume = (value: number) => {
    if (audioRef.current) {
      const newVolume = value / 100;
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    currentTime,
    duration,
    volume,
    isMuted,
    isLoading,
    play,
    pause,
    seek,
    changeVolume,
    toggleMute,
    formatTime,
  };
};