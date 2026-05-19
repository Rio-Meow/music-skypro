'use client';

import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setPlaylist } from '@/store/slices/playerSlice';
import styles from './Filter.module.css';

export function Filter() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.tracks);
  
  const [activeFilter, setActiveFilter] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [yearSort, setYearSort] = useState(null);

  useEffect(() => {
    if (items.length > 0) {
      const uniqueAuthors = [];
      items.forEach(track => {
        if (!uniqueAuthors.includes(track.author)) {
          uniqueAuthors.push(track.author);
        }
      });
      setAuthors(uniqueAuthors);

      const uniqueGenres = [];
      items.forEach(track => {
        if (track.genre) {
          if (Array.isArray(track.genre)) {
            track.genre.forEach(g => {
              if (!uniqueGenres.includes(g)) uniqueGenres.push(g);
            });
          } else {
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
      filtered = filtered.filter(track => track.author === selectedAuthor);
    }
    
    if (selectedGenre) {
      filtered = filtered.filter(track => {
        if (Array.isArray(track.genre)) {
          return track.genre.includes(selectedGenre);
        }
        return track.genre === selectedGenre;
      });
    }
    
    if (yearSort === 'newest') {
      filtered.sort((a, b) => {
        const yearA = parseInt(a.release_date?.split('-')[0] || 0);
        const yearB = parseInt(b.release_date?.split('-')[0] || 0);
        return yearB - yearA;
      });
    } else if (yearSort === 'oldest') {
      filtered.sort((a, b) => {
        const yearA = parseInt(a.release_date?.split('-')[0] || 0);
        const yearB = parseInt(b.release_date?.split('-')[0] || 0);
        return yearA - yearB;
      });
    }
    
    dispatch(setPlaylist(filtered));
  }, [items, selectedAuthor, selectedGenre, yearSort, dispatch]);

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleSelectAuthor = (author) => {
    setSelectedAuthor(selectedAuthor === author ? null : author);
    setActiveFilter(null);
  };

  const handleSelectGenre = (genre) => {
    setSelectedGenre(selectedGenre === genre ? null : genre);
    setActiveFilter(null);
  };

  const handleYearSort = (sort) => {
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
          {selectedAuthor && (
            <span className={styles.clearBtn} onClick={(e) => { e.stopPropagation(); clearAuthor(); }}>
              ×
            </span>
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
          onClick={() => toggleFilter('year')}
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
          onClick={() => toggleFilter('genre')}
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