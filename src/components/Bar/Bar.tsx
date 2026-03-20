'use client';

import { useEffect, useRef } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useAudioPlayerContext } from '@/context/AudioPlayerContext';
import Link from 'next/link';
import cn from 'classnames';
import styles from './Bar.module.css';

export function Bar() {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } = useAudioPlayerContext();
  const volumeRef = useRef<HTMLDivElement>(null);
  
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
      nextTrack();
    },
  });

  useEffect(() => {
    if (currentTrack) {
      if (isPlaying) {
        play();
      } else {
        pause();
      }
    }
  }, [isPlaying, currentTrack, play, pause]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (volumeRef.current && volumeRef.current.contains(e.target as Node)) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -5 : 5;
        const newVolume = Math.min(100, Math.max(0, volume * 100 + delta));
        changeVolume(newVolume);
      }
    };

    const volumeElement = volumeRef.current;
    if (volumeElement) {
      volumeElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (volumeElement) {
        volumeElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [volume, changeVolume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeVolume(Number(e.target.value));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
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

              <div className={styles.trackPlay__likeDis}>
                <div className={cn(styles.trackPlay__like, styles.btnIcon)}>
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div className={cn(styles.trackPlay__dislike, styles.btnIcon)}>
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className={styles.player__time}>
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className={styles.bar__volumeBlock} ref={volumeRef}>
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