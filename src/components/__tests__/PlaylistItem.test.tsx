import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PlaylistItem } from '../Playlist/PlaylistItem';

const mockTrack = {
  _id: 1,
  name: 'Test Track',
  author: 'Test Author',
  album: 'Test Album',
  duration_in_seconds: 245,
  track_file: 'test.mp3',
  logo: null,
  genre: ['Rock'],
  release_date: '2020-01-01',
  stared_user: [],
};

const createMockStore = () => {
  return configureStore({
    reducer: {
      player: (state = { currentTrack: null, isPlaying: false }) => state,
      auth: (state = { isAuthenticated: false }) => state,
      favorites: (state = { items: [] }) => state,
    },
  });
};

describe('PlaylistItem', () => {
  it('должен рендерить название трека', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <PlaylistItem track={mockTrack} />
      </Provider>
    );
    expect(screen.getByText('Test Track')).toBeDefined();
  });

  it('должен рендерить исполнителя', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <PlaylistItem track={mockTrack} />
      </Provider>
    );
    expect(screen.getByText('Test Author')).toBeDefined();
  });

  it('должен форматировать длительность', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <PlaylistItem track={mockTrack} />
      </Provider>
    );
    expect(screen.getByText('4:05')).toBeDefined();
  });
});