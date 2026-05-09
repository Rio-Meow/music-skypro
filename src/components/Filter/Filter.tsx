'use client';

import { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setPlaylist } from '@/store/slices/playerSlice';
import styles from './Filter.module.css';

type FilterType = 'author' | 'year' | 'genre' | null;
type YearSortType = 'newest' | 'oldest' | null;

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
      const uniqueAuthors = [...new Set(items.map(track => track.author))];
      setAuthors(uniqueAuthors);

      const allGenres = items.flatMap(track => track.genre);
      const uniqueGenres = [...new Set(allGenres)];
      setGenres(uniqueGenres);
    }
  }, [items]);

  const filterAndSortTracks = useCallback(() => {
    let filtered = [...items];
    
    if (selectedAuthor) {
      filtered = filtered.filter(track => track.author === selectedAuthor);
    }
    
    if (selectedGenre) {
      filtered = filtered.filter(track => track.genre.includes(selectedGenre));
    }
    
    if (yearSort === 'newest') {
      filtered.sort((a, b) => {
        const yearA = parseInt(a.release_date?.split('-')[0]) || 0;
        const yearB = parseInt(b.release_date?.split('-')[0]) || 0;
        return yearB - yearA;
      });
    } else if (yearSort === 'oldest') {
      filtered.sort((a, b) => {
        const yearA = parseInt(a.release_date?.split('-')[0]) || 0;
        const yearB = parseInt(b.release_date?.split('-')[0]) || 0;
        return yearA - yearB;
      });
    }
    
    dispatch(setPlaylist(filtered));
  }, [items, selectedAuthor, selectedGenre, yearSort, dispatch]);

  useEffect(() => {
    filterAndSortTracks();
  }, [filterAndSortTracks]);

  const toggleFilter = (filter: FilterType) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

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

  const getYearSortLabel = () => {
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
          onClick={() => toggleFilter('author')}
        >
          {selectedAuthor || 'исполнителю'}
          {selectedAuthor && <span className={styles.clearBtn} onClick={(e) => { e.stopPropagation(); handleSelectAuthor(selectedAuthor); }}>×</span>}
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
          onClick={() => toggleFilter('year')}
        >
          {getYearSortLabel()}
          {yearSort && <span className={styles.clearBtn} onClick={(e) => { e.stopPropagation(); handleYearSort(yearSort); }}>×</span>}
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
          onClick={() => toggleFilter('genre')}
        >
          {selectedGenre || 'жанру'}
          {selectedGenre && <span className={styles.clearBtn} onClick={(e) => { e.stopPropagation(); handleSelectGenre(selectedGenre); }}>×</span>}
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