import cn from 'classnames';
import { PlaylistItem } from './PlaylistItem';
import styles from './Playlist.module.css';

export function Playlist() {
  const tracks = [
    { id: 1, name: "Guilt", artist: "Nero", album: "Welcome Reality", duration: "4:44" },
    { id: 2, name: "Elektro", artist: "Dynoro, Outwork, Mr. Gee", album: "Elektro", duration: "2:22" },
    { id: 3, name: "I'm Fire", artist: "Ali Bakgor", album: "I'm Fire", duration: "2:22" },
    { id: 4, name: "Non Stop (Remix)", artist: "Стоункат, Psychopath", album: "Non Stop", duration: "4:12" },
    { id: 5, name: "Run Run (feat. AR/CO)", artist: "Jaded, Will Clarke, AR/CO", album: "Run Run", duration: "2:54" },
  ];

  return (
    <div className={styles.content}>
      <div className={styles.content__title}>
        <div className={cn(styles.playlistTitle__col, styles.col01)}>Трек</div>
        <div className={cn(styles.playlistTitle__col, styles.col02)}>Исполнитель</div>
        <div className={cn(styles.playlistTitle__col, styles.col03)}>Альбом</div>
        <div className={cn(styles.playlistTitle__col, styles.col04)}>
          <svg className={styles.playlistTitle__svg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
          </svg>
        </div>
      </div>
      <div className={styles.content__playlist}>
        {tracks.map(track => (
          <PlaylistItem 
            key={track.id}
            trackName={track.name}
            artist={track.artist}
            album={track.album}
            duration={track.duration}
          />
        ))}
      </div>
    </div>
  );
}