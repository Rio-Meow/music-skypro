'use client';

import cn from 'classnames';
import { useEffect } from 'react';
import { PlaylistItem } from './PlaylistItem';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTracks } from '@/store/slices/tracksSlice';
import { setPlaylist } from '@/store/slices/playerSlice';
import styles from './Playlist.module.css';

export function Playlist() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.tracks);
  const { playlist } = useAppSelector((state) => state.player);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTracks());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (items.length > 0 && playlist.length === 0) {
      dispatch(setPlaylist(items));
    }
  }, [items, playlist.length, dispatch]);

  if (status === 'loading') {
    return <div className={styles.loading}>Загрузка треков...</div>;
  }

  if (status === 'failed') {
    return <div className={styles.error}>Ошибка загрузки треков</div>;
  }

  const tracksToShow = playlist.length > 0 ? playlist : items;

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