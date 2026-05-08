'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPlaylist } from '@/store/slices/playerSlice';
import { fetchTracks } from '@/store/slices/tracksSlice';
import { PlaylistItem } from '@/components/Playlist/PlaylistItem';
import { Search } from '@/components/Search/Search';
import { Filter } from '@/components/Filter/Filter';
import { Bar } from '@/components/Bar/Bar';
import { getSelectionById } from '@/api/mockSelections';
import styles from './page.module.css';

export default function SelectionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.tracks);
  
  const [selectionName, setSelectionName] = useState<string>('');
  const [selectionTracks, setSelectionTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTracks());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'succeeded' && items.length > 0 && !initialized) {
      try {
        const selection = getSelectionById(Number(id), items);
        setSelectionName(selection.name);
        setSelectionTracks(selection.items);
        dispatch(setPlaylist(selection.items));
        setLoading(false);
        setInitialized(true);
      } catch (err) {
        setError('Подборка не найдена');
        setLoading(false);
        setInitialized(true);
      }
    }
    
    if (status === 'failed' && !initialized) {
      setError('Не удалось загрузить треки');
      setLoading(false);
      setInitialized(true);
    }
  }, [id, items, status, dispatch, initialized]);

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

  if (!selectionTracks.length) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Нет треков в подборке</div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <nav className={styles.main__nav}>
            <div className={styles.nav__logo}>
              <Image
                width={113}
                height={17}
                className={styles.logo__image}
                src="/img/logo.png"
                alt="logo"
                priority
              />
            </div>
            <div className={styles.nav__burger}>
              <span className={styles.burger__line}></span>
              <span className={styles.burger__line}></span>
              <span className={styles.burger__line}></span>
            </div>
            <div className={styles.nav__menu}>
              <ul className={styles.menu__list}>
                <li className={styles.menu__item}>
                  <Link href="/" className={styles.menu__link}>Главное</Link>
                </li>
                <li className={styles.menu__item}>
                  <Link href="#" className={styles.menu__link}>Мой плейлист</Link>
                </li>
                <li className={styles.menu__item}>
                  <Link href="/signin" className={styles.menu__link}>Войти</Link>
                </li>
              </ul>
            </div>
          </nav>
          
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
          
          <div className={styles.main__sidebar}>
            <div className={styles.sidebar__personal}>
              <p className={styles.sidebar__personalName}>Sergey.Ivanov</p>
              <div className={styles.sidebar__icon}>
                <svg>
                  <use xlinkHref="/img/icon/sprite.svg#logout"></use>
                </svg>
              </div>
            </div>
            <div className={styles.sidebar__block}>
              <div className={styles.sidebar__list}>
                <div className={styles.sidebar__item}>
                  <Link href="/selection/1" className={styles.sidebar__link}>
                    <Image
                      className={styles.sidebar__img}
                      src="/img/playlist01.png"
                      alt="playlist"
                      width={250}
                      height={150}
                      priority
                    />
                  </Link>
                </div>
                <div className={styles.sidebar__item}>
                  <Link href="/selection/2" className={styles.sidebar__link}>
                    <Image
                      className={styles.sidebar__img}
                      src="/img/playlist02.png"
                      alt="playlist"
                      width={250}
                      height={150}
                      priority
                    />
                  </Link>
                </div>
                <div className={styles.sidebar__item}>
                  <Link href="/selection/3" className={styles.sidebar__link}>
                    <Image
                      className={styles.sidebar__img}
                      src="/img/playlist03.png"
                      alt="playlist"
                      width={250}
                      height={150}
                      priority
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Bar />
      </div>
    </div>
  );
}