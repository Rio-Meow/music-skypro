'use client';

import cn from 'classnames';
import { useEffect } from 'react';
import { PlaylistItem } from './PlaylistItem';
import { useAudioPlayerContext } from '@/context/AudioPlayerContext';
import { data } from '@/data';
import styles from './Playlist.module.css';

export function Playlist() {
  const { playlist, setPlaylist, currentTrack, isPlaying } = useAudioPlayerContext();

  useEffect(() => {
    if (playlist.length === 0) {
      setPlaylist(data);
    }
  }, [playlist, setPlaylist]);

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
        {playlist.map(track => (
          <PlaylistItem 
            key={track._id}
            track={track}
            isCurrentTrack={currentTrack?._id === track._id}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
}