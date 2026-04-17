'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { Nav } from '@/components/Nav/Nav';
import { Centerblock } from '@/components/Centerblock/Centerblock';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Bar } from '@/components/Bar/Bar';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, status } = useAppSelector((state) => state.auth);

  console.log('Home page - auth state:', { isAuthenticated, status });

  useEffect(() => {
    if (!isAuthenticated && status !== 'loading') {
      console.log('Not authenticated, redirecting to signin');
      router.push('/signin');
    }
  }, [isAuthenticated, router, status]);

  if (!isAuthenticated) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <Centerblock />
          <Sidebar />
        </main>
        <Bar />
      </div>
    </div>
  );
}