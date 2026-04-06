'use client';

import { useState, useEffect } from 'react';
import cn from 'classnames';
import { data } from '@/data';
import styles from './Filter.module.css';

type FilterType = 'author' | 'year' | 'genre' | null;

export function Filter() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [authors, setAuthors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  
  const [yearSort, setYearSort] = useState<'newest' | 'oldest' | null>(null);

  useEffect(() => {

    const uniqueAuthors = [...new Set(data.map(track => track.author))];
    setAuthors(uniqueAuthors);

    const allGenres = data.flatMap(track => track.genre);
    const uniqueGenres = [...new Set(allGenres)];
    setGenres(uniqueGenres);
  }, []);

  const toggleFilter = (filter: FilterType) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const handleYearSort = (sort: 'newest' | 'oldest') => {
    if (yearSort === sort) {
      setYearSort(null);
    } else {
      setYearSort(sort);
    }
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filter__title}>Искать по:</div>
      
      <div className={styles.filter__wrapper}>
        <div 
          className={cn(styles.filter__button, { [styles.active]: activeFilter === 'author' })}
          onClick={() => toggleFilter('author')}
        >
          исполнителю
        </div>
        {activeFilter === 'author' && (
          <div className={styles.filter__dropdown}>
            <div className={styles.filter__list}>
              {authors.map(author => (
                <div key={author} className={styles.filter__item}>
                  {author}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.filter__wrapper}>
        <div 
          className={cn(styles.filter__button, { [styles.active]: activeFilter === 'year' })}
          onClick={() => toggleFilter('year')}
        >
          году выпуска
        </div>
        {activeFilter === 'year' && (
          <div className={styles.filter__dropdown}>
            <div className={styles.filter__list}>
              <div 
                className={cn(styles.filter__item, { [styles.activeSort]: yearSort === 'newest' })}
                onClick={() => handleYearSort('newest')}
              >
                Сначала новые
              </div>
              <div 
                className={cn(styles.filter__item, { [styles.activeSort]: yearSort === 'oldest' })}
                onClick={() => handleYearSort('oldest')}
              >
                Сначала старые
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.filter__wrapper}>
        <div 
          className={cn(styles.filter__button, { [styles.active]: activeFilter === 'genre' })}
          onClick={() => toggleFilter('genre')}
        >
          жанру
        </div>
        {activeFilter === 'genre' && (
          <div className={styles.filter__dropdown}>
            <div className={styles.filter__list}>
              {genres.map(genre => (
                <div key={genre} className={styles.filter__item}>
                  {genre}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}