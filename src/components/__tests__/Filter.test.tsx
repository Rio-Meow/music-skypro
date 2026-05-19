import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Filter } from '../Filter/Filter';

const createMockStore = () => {
  return configureStore({
    reducer: {
      tracks: (state = { items: [] }) => state,
      player: (state = { playlist: [] }) => state,
    },
  });
};

describe('Filter Component', () => {
  it('должен рендерить поле поиска', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );
    expect(screen.getByPlaceholderText(/поиск/i)).toBeDefined();
  });

  it('должен рендерить кнопки фильтров', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );
    expect(screen.getByText('исполнителю')).toBeDefined();
    expect(screen.getByText('году выпуска')).toBeDefined();
    expect(screen.getByText('жанру')).toBeDefined();
  });
});