'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPlaylist } from '@/store/slices/playerSlice';
import { fetchTracks } from '@/store/slices/tracksSlice';
import { Nav } from '@/components/Nav/Nav';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PlaylistItem } from '@/components/Playlist/PlaylistItem';
import { Search } from '@/components/Search/Search';
import { Filter } from '@/components/Filter/Filter';
import { Bar } from '@/components/Bar/Bar';
import { Track } from '@/types/track';
import { getSelectionById } from '@/api/mockSelections';
import styles from './page.module.css';

export default function SelectionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.tracks);
  
  const [selectionName, setSelectionName] = useState<string>('');
  const [selectionTracks, setSelectionTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTracks());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'succeeded' && items.length > 0 && loading) {
      try {
        const selection = getSelectionById(Number(id), items);
        setSelectionName(selection.name);
        setSelectionTracks(selection.items);
        dispatch(setPlaylist(selection.items));
        setLoading(false);
      } catch (err) {
        setError('Подборка не найдена');
        setLoading(false);
      }
    }
    
    if (status === 'failed' && loading) {
      setError('Не удалось загрузить треки');
      setLoading(false);
    }
  }, [id, items, status, dispatch, loading]);

  if (loading || status === 'loading') {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Загрузка подборки...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.error}>{error}</div>
        <button onClick={() => router.push('/')} className={styles.backBtn}>
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          
          <div className={styles.centerblock}>
            <Search />
            <h2 className={styles.centerblock__h2}>{selectionName}</h2>
            <Filter />
            <div className={styles.centerblock__content}>
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
                {selectionTracks.map((track) => (
                  <PlaylistItem key={track._id} track={track} />
                ))}
              </div>
            </div>
          </div>
          
          <Sidebar />
        </main>
        <Bar />
      </div>
    </div>
  );
}