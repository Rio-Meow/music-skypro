'use client';

import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setPlaylist } from '@/store/slices/playerSlice';
import { Track } from '@/types/track';
import styles from './Filter.module.css';

type YearSortType = 'newest' | 'oldest' | null;

export function Filter() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.tracks);
  
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [authors, setAuthors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [yearSort, setYearSort] = useState<YearSortType>(null);

  useEffect(() => {
    if (items.length > 0) {
      const uniqueAuthors: string[] = [];
      items.forEach((track: Track) => {
        if (!uniqueAuthors.includes(track.author)) {
          uniqueAuthors.push(track.author);
        }
      });
      setAuthors(uniqueAuthors);

      const uniqueGenres: string[] = [];
      items.forEach((track: Track) => {
        if (track.genre) {
          if (Array.isArray(track.genre)) {
            track.genre.forEach((g: string) => {
              if (!uniqueGenres.includes(g)) uniqueGenres.push(g);
            });
          } else if (typeof track.genre === 'string') {
            if (!uniqueGenres.includes(track.genre)) uniqueGenres.push(track.genre);
          }
        }
      });
      setGenres(uniqueGenres);
    }
  }, [items]);

  useEffect(() => {
    if (items.length === 0) return;
    
    let filtered = [...items];
    
    if (selectedAuthor) {
      filtered = filtered.filter((track: Track) => track.author === selectedAuthor);
    }
    
    if (selectedGenre) {
      filtered = filtered.filter((track: Track) => {
        if (Array.isArray(track.genre)) {
          return track.genre.includes(selectedGenre);
        }
        return track.genre === selectedGenre;
      });
    }
    
    if (yearSort === 'newest') {
      filtered.sort((a: Track, b: Track) => {
        const yearA = parseInt(a.release_date?.split('-')[0] || '0');
        const yearB = parseInt(b.release_date?.split('-')[0] || '0');
        return yearB - yearA;
      });
    } else if (yearSort === 'oldest') {
      filtered.sort((a: Track, b: Track) => {
        const yearA = parseInt(a.release_date?.split('-')[0] || '0');
        const yearB = parseInt(b.release_date?.split('-')[0] || '0');
        return yearA - yearB;
      });
    }
    
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

  const clearAuthor = () => {
    setSelectedAuthor(null);
  };

  const clearGenre = () => {
    setSelectedGenre(null);
  };

  const clearYearSort = () => {
    setYearSort(null);
  };

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
            <span className={styles.clearBtn} onClick={(e) => { e.stopPropagation(); clearAuthor(); }}>
              ×
            </span>
          )}
        </div>
        {activeFilter === 'author' && (
          <div className={styles.filter__dropdown}>
            <div className={styles.filter__list}>
              {authors.map((author) => (
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
            <span className={styles.clearBtn} onClick={(e) => { e.stopPropagation(); clearYearSort(); }}>
              ×
            </span>
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
            <span className={styles.clearBtn} onClick={(e) => { e.stopPropagation(); clearGenre(); }}>
              ×
            </span>
          )}
        </div>
        {activeFilter === 'genre' && (
          <div className={styles.filter__dropdown}>
            <div className={styles.filter__list}>
              {genres.map((genre) => (
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