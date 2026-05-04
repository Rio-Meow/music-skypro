'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/signin');
  };

  const userName = user?.username || user?.email || 'Гость';
  const displayName = isAuthenticated ? userName : 'Гость';

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{displayName}</p>
        <div className={styles.sidebar__icon} onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <svg width="24" height="24" viewBox="0 0 24 24">
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
  );
}