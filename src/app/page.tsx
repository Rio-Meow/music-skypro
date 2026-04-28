'use client';

import { Nav } from '@/components/Nav/Nav';
import { Centerblock } from '@/components/Centerblock/Centerblock';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Bar } from '@/components/Bar/Bar';
import styles from './page.module.css';

export default function Home() {
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