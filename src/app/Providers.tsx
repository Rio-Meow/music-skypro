'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { restoreSession } from '@/store/slices/authSlice';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(restoreSession());
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}