'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Burger } from '../Burger/Burger';
import styles from './Nav.module.css';

export function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav__logo}>
        <Link href="/">
          <Image
            className={styles.logo__image}
            src="/img/logo.png"
            alt="logo"
            width={113}
            height={17}
            priority
          />
        </Link>
      </div>
      <Burger />
    </nav>
  );
}