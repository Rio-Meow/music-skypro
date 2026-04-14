'use client';

import cn from 'classnames';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentTrack, setIsPlaying } from '@/store/slices/playerSlice';
import styles from './PlaylistItem.module.css';

interface Track {
  _id: number;
  name: string;
  author: string;
  album: string;
  duration_in_seconds: number;
  track_file: string;
  logo: string | null;
}

interface PlaylistItemProps {
  track: Track;
}

export function PlaylistItem({ track }: PlaylistItemProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  
  const isTrackPlaying = currentTrack?._id === track._id && isPlaying;

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTrackName = (name: string) => {
    const bracketRegex = /\([^)]*\)/g;
    const parts = name.split(bracketRegex);
    const brackets = name.match(bracketRegex);
    
    if (brackets) {
      return (
        <>
          {parts[0]}
          <span className={styles.track__titleSpan}>{brackets[0]}</span>
          {parts[1]}
        </>
      );
    }
    return name;
  };

  const handlePlayClick = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
  };

  return (
    <div className={cn(styles.item, { [styles.playing]: isTrackPlaying })}>
      <div className={styles.track}>
        <div className={styles.track__title}>
          <div 
            className={styles.track__titleImage} 
            onClick={handlePlayClick}
            style={{ cursor: 'pointer' }}
          >
            {isTrackPlaying ? (
              <div className={styles.playingAnimation}>
                <span></span><span></span><span></span>
              </div>
            ) : (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <div className={styles.track__titleText}>
            <Link href={`/track/${track._id}`} className={styles.track__titleLink}>
              {formatTrackName(track.name)}
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link href={`/artist/${track.author}`} className={styles.track__authorLink}>
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link href={`/album/${track.album}`} className={styles.track__albumLink}>
            {track.album}
          </Link>
        </div>
        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>{formatDuration(track.duration_in_seconds)}</span>
        </div>
      </div>
    </div>
  );
}