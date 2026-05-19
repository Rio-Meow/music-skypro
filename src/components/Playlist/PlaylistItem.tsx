'use client';

import { useCallback, memo } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentTrack, setIsPlaying } from '@/store/slices/playerSlice';
import { addToFavorites, removeFromFavorites, fetchFavorites } from '@/store/slices/favoritesSlice';
import { Track } from '@/types/track';
import styles from './PlaylistItem.module.css';

interface PlaylistItemProps {
  track: Track;
}

const formatDuration = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
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

const PlaylistItemComponent = ({ track }: PlaylistItemProps) => {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const { accessToken, isAuthenticated } = useAppSelector((state) => state.auth);
  const { items: favorites } = useAppSelector((state) => state.favorites);
  
  const isCurrentTrack = currentTrack?._id === track._id;
  const isTrackPlaying = isCurrentTrack && isPlaying;
  const isLiked = favorites.some(fav => fav._id === track._id);

  const handlePlayClick = useCallback(() => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
  }, [dispatch, track]);

  const handleLikeClick = useCallback(async () => {
    if (!isAuthenticated || !accessToken) {
      alert('Необходимо авторизоваться');
      return;
    }
    
    try {
      if (isLiked) {
        await dispatch(removeFromFavorites({ trackId: track._id, accessToken })).unwrap();
      } else {
        await dispatch(addToFavorites({ trackId: track._id, accessToken })).unwrap();
        await dispatch(fetchFavorites(accessToken));
      }
    } catch {
      alert('Ошибка при изменении статуса лайка');
    }
  }, [isAuthenticated, isLiked, track._id, accessToken, dispatch]);

  return (
    <div className={cn(styles.item, { [styles.playing]: isCurrentTrack && isTrackPlaying })}>
      <div className={styles.track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage} onClick={handlePlayClick}>
            {isCurrentTrack ? (
              <div className={cn(styles.playingAnimation, { [styles.animate]: isTrackPlaying })}>
                <div className={styles.dot}></div>
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
          <button 
            className={cn(styles.likeBtn, { [styles.liked]: isLiked })}
            onClick={handleLikeClick}
            aria-label={isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <svg className={styles.track__timeSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
            </svg>
          </button>
          <span className={styles.track__timeText}>{formatDuration(track.duration_in_seconds)}</span>
        </div>
      </div>
    </div>
  );
};

export const PlaylistItem = memo(PlaylistItemComponent);