'use client';

import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setPlaylist } from '@/store/slices/playerSlice';
import { extractUniqueAuthors, extractUniqueGenres } from '@/utils/filterUtils';
import { filterTracksByAuthor, filterTracksByGenre, sortTracksByYear } from '@/utils/trackFilters';
import { FilterType, YearSortType } from '@/types/filters';
import styles from './Filter.module.css';

export function Filter() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.tracks);
  
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [authors, setAuthors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [yearSort, setYearSort] = useState<YearSortType>(null);

  useEffect(() => {
    if (items.length > 0) {
      setAuthors(extractUniqueAuthors(items));
      setGenres(extractUniqueGenres(items));
    }
  }, [items]);

  useEffect(() => {
    if (items.length === 0) return;
    
    let filtered = [...items];
    filtered = filterTracksByAuthor(filtered, selectedAuthor);
    filtered = filterTracksByGenre(filtered, selectedGenre);
    filtered = sortTracksByYear(filtered, yearSort);
    
    dispatch(setPlaylist(filtered));
  }, [items, selectedAuthor, selectedGenre, yearSort, dispatch]);

  const handleSelectAuthor = (author: string) => {
    setSelectedAuthor(selectedAuthor === author ? null : author);
    setActiveFilter(null);
  };

  const handleSelectGenre = (genre: string) => {
    setSelectedGenre(selectedGenre === genre ? null : genre);
    setActiveFilter(null);
  };

  const handleYearSort = (sort: YearSortType) => {
    setYearSort(yearSort === sort ? null : sort);
    setActiveFilter(null);
  };

  const clearAuthor = () => setSelectedAuthor(null);
  const clearGenre = () => setSelectedGenre(null);
  const clearYearSort = () => setYearSort(null);

  const getYearSortLabel = (): string => {
    if (yearSort === 'newest') return 'сначала новые';
    if (yearSort === 'oldest') return 'сначала старые';
    return 'году выпуска';
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filter__title}>Искать по:</div>
      
      <div className={styles.filter__wrapper}>
        <div 
          className={cn(styles.filter__button, { [styles.active]: activeFilter === 'author' || selectedAuthor })}
          onClick={() => setActiveFilter(activeFilter === 'author' ? null : 'author')}
        >
          {selectedAuthor || 'исполнителю'}
          {selectedAuthor && (
            <span className={styles.clearBtn} onClick={(e) => { e.stopPropagation(); clearAuthor(); }}>×</span>
          )}
        </div>
        {activeFilter === 'author' && (
          <div className={styles.filter__dropdown}>
            <div className={styles.filter__list}>
              {authors.map(author => (
                <div 
                  key={author} 
                  className={cn(styles.filter__item, { [styles.selected]: selectedAuthor === author })}
                  onClick={() => handleSelectAuthor(author)}
                >
                  {author}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.filter__wrapper}>
        <div 
          className={cn(styles.filter__button, { [styles.active]: activeFilter === 'year' || yearSort })}
          onClick={() => setActiveFilter(activeFilter === 'year' ? null : 'year')}
        >
          {getYearSortLabel()}
          {yearSort && (
            <span className={styles.clearBtn} onClick={(e) => { e.stopPropagation(); clearYearSort(); }}>×</span>
          )}
        </div>
        {activeFilter === 'year' && (
          <div className={styles.filter__dropdown}>
            <div className={styles.filter__list}>
              <div 
                className={cn(styles.filter__item, { [styles.selected]: yearSort === 'newest' })}
                onClick={() => handleYearSort('newest')}
              >
                Сначала новые
              </div>
              <div 
                className={cn(styles.filter__item, { [styles.selected]: yearSort === 'oldest' })}
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
          className={cn(styles.filter__button, { [styles.active]: activeFilter === 'genre' || selectedGenre })}
          onClick={() => setActiveFilter(activeFilter === 'genre' ? null : 'genre')}
        >
          {selectedGenre || 'жанру'}
          {selectedGenre && (
            <span className={styles.clearBtn} onClick={(e) => { e.stopPropagation(); clearGenre(); }}>×</span>
          )}
        </div>
        {activeFilter === 'genre' && (
          <div className={styles.filter__dropdown}>
            <div className={styles.filter__list}>
              {genres.map(genre => (
                <div 
                  key={genre} 
                  className={cn(styles.filter__item, { [styles.selected]: selectedGenre === genre })}
                  onClick={() => handleSelectGenre(genre)}
                >
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