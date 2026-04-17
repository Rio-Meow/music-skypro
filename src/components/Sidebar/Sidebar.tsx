'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>Sergey.Ivanov</p>
        <div className={styles.sidebar__icon} onClick={handleLogout}>
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