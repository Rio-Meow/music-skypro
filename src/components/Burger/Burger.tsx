'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './Burger.module.css';

export function Burger() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
              <Link href="#" className={styles.menuLink} onClick={() => setIsOpen(false)}>
                Мой плейлист
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}