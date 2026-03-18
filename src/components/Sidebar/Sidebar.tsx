'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>Sergey.Ivanov</p>
        <div className={styles.sidebar__icon}>
          <svg width="43" height="43" viewBox="0 0 43 43" style={{ width: '43px', height: '43px' }}>
            <use xlinkHref="/img/icon/sprite.svg#logout" width="43" height="43"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link href="/playlist/1" className={styles.sidebar__link}>
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link href="/playlist/2" className={styles.sidebar__link}>
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link href="/playlist/3" className={styles.sidebar__link}>
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}