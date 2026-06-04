import { describe, it, expect } from 'vitest';
import { filterBySearch, filterByAuthor, filterByGenre, sortByYear } from './filterUtils';
import { Track } from '@/types/track';

const mockTracks: Track[] = [
  {
    _id: 1,
    name: 'Chase',
    author: 'Alexander Nakarada',
    genre: ['Classical'],
    release_date: '2005-06-11',
    duration_in_seconds: 205,
    album: 'Chase',
    track_file: 'url',
    logo: null,
    stared_user: [],
  },
  {
    _id: 2,
    name: 'Open Sea',
    author: 'Frank Schroter',
    genre: ['Classical'],
    release_date: '2019-06-12',
    duration_in_seconds: 165,
    album: 'Open Sea',
    track_file: 'url',
    logo: null,
    stared_user: [],
  },
  {
    _id: 3,
    name: 'Sneaky Snitch',
    author: 'Kevin Macleod',
    genre: ['Jazz'],
    release_date: '2022-04-16',
    duration_in_seconds: 305,
    album: 'Sneaky Snitch',
    track_file: 'url',
    logo: null,
    stared_user: [],
  },
  {
    _id: 4,
    name: 'Secret Garden',
    author: 'Mixkit',
    genre: ['Electronic', 'Ambient'],
    release_date: '1972-06-06',
    duration_in_seconds: 324,
    album: 'Secret Garden',
    track_file: 'url',
    logo: null,
    stared_user: [],
  },
];

describe('filterBySearch', () => {
  it('должен возвращать все треки при пустом поисковом запросе', () => {
    const result = filterBySearch(mockTracks, '');
    expect(result.length).toBe(4);
  });

  it('должен фильтровать треки по названию', () => {
    const result = filterBySearch(mockTracks, 'Chase');
    expect(result.length).toBe(1);
    expect(result[0]?.name).toBe('Chase');
  });
});

describe('filterByAuthor', () => {
  it('должен фильтровать треки по исполнителю', () => {
    const result = filterByAuthor(mockTracks, 'Mixkit');
    expect(result.length).toBe(1);
    expect(result[0]?.author).toBe('Mixkit');
  });
});

describe('filterByGenre', () => {
  it('должен фильтровать треки по жанру', () => {
    const result = filterByGenre(mockTracks, 'Jazz');
    expect(result.length).toBe(1);
    expect(result[0]?.genre).toContain('Jazz');
  });
});

describe('sortByYear', () => {
  it('должен сортировать по новизне', () => {
    const result = sortByYear(mockTracks, 'newest');
    expect(result[0]?.release_date).toBe('2022-04-16');
    expect(result[3]?.release_date).toBe('1972-06-06');
  });

  it('должен сортировать по старым', () => {
    const result = sortByYear(mockTracks, 'oldest');
    expect(result[0]?.release_date).toBe('1972-06-06');
    expect(result[3]?.release_date).toBe('2022-04-16');
  });
});