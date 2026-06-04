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
        <div className={styles.errorIcon}>⚠️</div>
        <p className={styles.errorTitle}>Ошибка загрузки</p>
        <p className={styles.errorMessage}>{error || 'Не удалось загрузить треки. Попробуйте позже.'}</p>
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
        <div className={styles.emptyIcon}>🔍</div>
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