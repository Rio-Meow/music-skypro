'use client';

import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { PlaylistItem } from './PlaylistItem';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTracks } from '@/store/slices/tracksSlice';
import { setPlaylist } from '@/store/slices/playerSlice';
import styles from './Playlist.module.css';

export function Playlist() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.tracks);
  const { playlist } = useAppSelector((state) => state.player);
  const initialized = useRef(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTracks());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (items.length > 0 && playlist.length === 0 && !initialized.current) {
      initialized.current = true;
      dispatch(setPlaylist(items));
    }
  }, [items, playlist.length, dispatch]);

  if (status === 'loading') {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Загрузка треков...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className={styles.error}>
        <p>Ошибка загрузки треков: {error}</p>
        <button onClick={() => dispatch(fetchTracks())} className={styles.retryBtn}>
          Попробовать снова
        </button>
      </div>
    );
  }

  const tracksToShow = playlist;

  if (items.length > 0 && tracksToShow.length === 0) {
    return (
      <div className={styles.empty}>
        <svg className={styles.emptyIcon} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p className={styles.emptyTitle}>Ничего не найдено</p>
        <p className={styles.emptyHint}>Попробуйте изменить параметры поиска или фильтрации</p>
      </div>
    );
  }

  if (tracksToShow.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Нет доступных треков</p>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.content__title}>
        <div className={cn(styles.playlistTitle__col, styles.col01)}>Трек</div>
        <div className={cn(styles.playlistTitle__col, styles.col02)}>Исполнитель</div>
        <div className={cn(styles.playlistTitle__col, styles.col03)}>Альбом</div>
        <div className={cn(styles.playlistTitle__col, styles.col04)}>
          <svg className={styles.playlistTitle__svg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
          </svg>
        </div>
      </div>
      <div className={styles.content__playlist}>
        {tracksToShow.map(track => (
          <PlaylistItem key={track._id} track={track} />
        ))}
      </div>
    </div>
  );
}