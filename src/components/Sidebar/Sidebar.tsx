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
        {isAuthenticated && (
          <div className={styles.sidebar__icon} onClick={handleLogout}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.6711 16.046V14.7419C25.6711 13.2276 24.4435 12 22.9292 12H16.7419C15.2276 12 14 13.2276 14 14.7419V26.0645C14 27.5788 15.2276 28.8065 16.7419 28.8065H22.9292C24.4435 28.8065 25.6711 27.5788 25.6711 26.0645V24.6048M18.3572 20.3254H33.2963M30.1062 17.1353L33.2963 20.3254L30.1062 23.5155" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="20" cy="20" r="19.5" stroke="white"/>
            </svg>
          </div>
        )}
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