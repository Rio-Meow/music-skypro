'use client';

import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import { useAppSelector } from '@/store/hooks';
import { Nav } from '@/components/Nav/Nav';
import { Search } from '@/components/Search/Search';
import { Filter } from '@/components/Filter/Filter';
import { Bar } from '@/components/Bar/Bar';
import styles from './page.module.css';

export default function PlaylistPage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

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
                  <Link href="/playlist" className={styles.menu__link}>Мой плейлист</Link>
                </li>
                {!isAuthenticated && (
                  <li className={styles.menu__item}>
                    <Link href="/signin" className={styles.menu__link}>Войти</Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
          
          <div className={styles.centerblock}>
            <Search />
            <h2 className={styles.centerblock__h2}>Мои треки</h2>
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
                <div className={styles.empty}>
                  <p>У вас пока нет добавленных треков</p>
                </div>
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