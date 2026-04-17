'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  togglePlay,
  nextTrack,
  prevTrack,
  setIsRepeat,
  setIsShuffle,
  setCurrentTime,
  setDuration,
} from '@/store/slices/playerSlice';
import Link from 'next/link';
import cn from 'classnames';
import styles from './Bar.module.css';

export function Bar() {
  const dispatch = useAppDispatch();
  const { 
    currentTrack, 
    isPlaying, 
    isRepeat, 
    isShuffle,
    volume: reduxVolume,
    isMuted: reduxIsMuted
  } = useAppSelector((state) => state.player);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isRepeatRef = useRef(isRepeat);
  
  const [currentTime, setCurrentTimeLocal] = useState(0);
  const [duration, setDurationLocal] = useState(0);
  const [volume, setVolumeLocal] = useState(0.5);
  const [isMuted, setIsMutedLocal] = useState(false);
  
  useEffect(() => {
    isRepeatRef.current = isRepeat;
  }, [isRepeat]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      
      const handleTimeUpdate = () => {
        if (audioRef.current) {
          const time = audioRef.current.currentTime;
          setCurrentTimeLocal(time);
          dispatch(setCurrentTime(time));
        }
      };
      
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          const dur = audioRef.current.duration;
          setDurationLocal(dur);
          dispatch(setDuration(dur));
        }
      };
      
      const handleEnded = () => {
        if (isRepeatRef.current) {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        } else {
          dispatch(nextTrack());
        }
      };
      
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.pause();
        }
      };
    }
  }, [dispatch]);
  
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      const wasPlaying = isPlaying;
      audioRef.current.src = currentTrack.track_file;
      audioRef.current.load();
      audioRef.current.volume = volume;
      
      if (wasPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrack]);
  
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);
  
  // Громкость
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value) / 100;
    setVolumeLocal(newVolume);
    setIsMutedLocal(newVolume === 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTimeLocal(time);
      dispatch(setCurrentTime(time));
    }
  };

  const handleRepeatClick = () => {
    dispatch(setIsRepeat(!isRepeat));
  };

  const handleShuffleClick = () => {
    dispatch(setIsShuffle(!isShuffle));
  };

  const handlePlayClick = () => {
    dispatch(togglePlay());
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolumeLocal(0.5);
      setIsMutedLocal(false);
    } else {
      setVolumeLocal(0);
      setIsMutedLocal(true);
    }
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) {
    return null;
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.bar}>
      <div className={styles.bar__content}>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={() => dispatch(prevTrack())}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div className={cn(styles.player__btnPlay, styles.btn)} onClick={handlePlayClick}>
                <svg className={styles.player__btnPlaySvg}>
                  <use xlinkHref={`/img/icon/sprite.svg#icon-${isPlaying ? 'pause' : 'play'}`}></use>
                </svg>
              </div>
              <div className={styles.player__btnNext} onClick={() => dispatch(nextTrack())}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div className={cn(styles.player__btnRepeat, styles.btnIcon)} onClick={handleRepeatClick}>
                <svg className={cn(styles.player__btnRepeatSvg, { [styles.active]: isRepeat })}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div className={cn(styles.player__btnShuffle, styles.btnIcon)} onClick={handleShuffleClick}>
                <svg className={cn(styles.player__btnShuffleSvg, { [styles.active]: isShuffle })}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__info}>
                  <div className={styles.trackPlay__name}>
                    <Link href={`/track/${currentTrack._id}`} className={styles.trackPlay__nameLink}>
                      {currentTrack.name}
                    </Link>
                  </div>
                  <div className={styles.trackPlay__author}>
                    <Link href={`/artist/${currentTrack.author}`} className={styles.trackPlay__authorLink}>
                      {currentTrack.author}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.player__time}>
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image} onClick={toggleMute}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref={`/img/icon/sprite.svg#icon-volume-${isMuted ? 'off' : 'on'}`}></use>
                </svg>
              </div>
              <div className={cn(styles.volume__progress, styles.btn)}>
                <input
                  className={styles.volume__progressLine}
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bar__playerProgress}>
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className={styles.playerProgressLine}
          style={{
            background: `linear-gradient(to right, #580ea2 0%, #580ea2 ${progressPercentage}%, #2e2e2e ${progressPercentage}%, #2e2e2e 100%)`
          }}
        />
      </div>
    </div>
  );
}