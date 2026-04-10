'use client';

import { useEffect } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useAudioPlayerContext } from '@/context/AudioPlayerContext';
import Link from 'next/link';
import cn from 'classnames';
import styles from './Bar.module.css';

export function Bar() {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    nextTrack, 
    prevTrack, 
    isRepeat, 
    setIsRepeat, 
    isShuffle, 
    setIsShuffle 
  } = useAudioPlayerContext();
  
  const {
    currentTime,
    duration,
    volume,
    isMuted,
    seek,
    changeVolume,
    toggleMute,
    formatTime,
    play,
    pause,
  } = useAudioPlayer({
    src: currentTrack?.track_file || null,
    onEnded: () => {
      console.log('Track ended');
      if (isRepeat) {
        seek(0);
        play();
      } else {
        nextTrack();
      }
    },
  });

  // Синхронизация isPlaying из контекста с аудио
  useEffect(() => {
    if (currentTrack) {
      if (isPlaying) {
        play();
      } else {
        pause();
      }
    }
  }, [isPlaying, currentTrack, play, pause]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeVolume(Number(e.target.value));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleRepeatClick = () => {
    setIsRepeat(!isRepeat);
  };

  const handleShuffleClick = () => {
    setIsShuffle(!isShuffle);
  };

  const handlePlayClick = () => {
    togglePlay();
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
              <div className={styles.player__btnPrev} onClick={prevTrack}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div className={cn(styles.player__btnPlay, styles.btn)} onClick={handlePlayClick}>
                <svg className={styles.player__btnPlaySvg}>
                  <use xlinkHref={`/img/icon/sprite.svg#icon-${isPlaying ? 'pause' : 'play'}`}></use>
                </svg>
              </div>
              <div className={styles.player__btnNext} onClick={nextTrack}>
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