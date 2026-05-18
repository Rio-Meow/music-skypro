'use client';

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setPlaylist } from '@/store/slices/playerSlice';
import styles from './Search.module.css';

export function Search() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.tracks);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (items.length === 0) return;
    
    let filtered = [...items];
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(track => 
        track.name.toLowerCase().includes(query) || 
        track.author.toLowerCase().includes(query)
      );
    }
    
    dispatch(setPlaylist(filtered));
  }, [searchQuery, items, dispatch]);

  const handleClear = () => {
    setSearchQuery('');
    dispatch(setPlaylist(items));
  };

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button className={styles.clearSearch} onClick={handleClear}>
          ×
        </button>
      )}
    </div>
  );
}