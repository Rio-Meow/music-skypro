'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import styles from './Burger.module.css';

export function Burger() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    router.push('/signin');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (burgerRef.current && burgerRef.current.contains(event.target as Node)) {
        return;
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.burgerContainer}>
      <div className={styles.burger} onClick={toggleMenu} ref={burgerRef}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      
      {isOpen && (
        <div className={styles.menu} ref={menuRef}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/" className={styles.menuLink} onClick={() => setIsOpen(false)}>
                Главное
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/playlist" className={styles.menuLink} onClick={() => setIsOpen(false)}>
                Мой плейлист
              </Link>
            </li>
            {isAuthenticated ? (
              <li className={styles.menuItem}>
                <button onClick={handleLogout} className={styles.menuButton}>
                  Выйти
                </button>
              </li>
            ) : (
              <li className={styles.menuItem}>
                <Link href="/signin" className={styles.menuLink} onClick={() => setIsOpen(false)}>
                  Войти
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}