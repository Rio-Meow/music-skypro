import { Search } from '../Search/Search';
import { Filter } from '../Filter/Filter';
import { Playlist } from '../Playlist/Playlist';
import styles from './Centerblock.module.css';

export function Centerblock() {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter />
      <Playlist />
    </div>
  );
}