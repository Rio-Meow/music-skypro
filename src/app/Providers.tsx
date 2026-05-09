'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { restoreSession } from '@/store/slices/authSlice';
import { fetchFavorites } from '@/store/slices/favoritesSlice';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const init = async () => {
      await store.dispatch(restoreSession());
      const state = store.getState();
      if (state.auth.isAuthenticated && state.auth.accessToken) {
        store.dispatch(fetchFavorites(state.auth.accessToken));
      }
    };
    init();
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}