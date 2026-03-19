import cn from 'classnames';
import Link from 'next/link'; 
import styles from './PlaylistItem.module.css';

interface PlaylistItemProps {
  trackName?: string;
  artist?: string;
  album?: string;
  duration?: string;
  trackId?: number;
  artistId?: string;
  albumId?: string;
}

export function PlaylistItem({ 
  trackName = "Guilt", 
  artist = "Nero", 
  album = "Welcome Reality", 
  duration = "4:44",
  trackId = 1,
  artistId = "nero",
  albumId = "welcome-reality"
}: PlaylistItemProps) {

  const formatTrackName = (name: string) => {
    const bracketRegex = /\([^)]*\)/g;
    const parts = name.split(bracketRegex);
    const brackets = name.match(bracketRegex);
    
    if (brackets) {
      return (
        <>
          {parts[0]}
          <span className={styles.track__titleSpan}>{brackets[0]}</span>
          {parts[1]}
        </>
      );
    }
    return name;
  };

  return (
    <div className={styles.item}>
      <div className={styles.track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className={styles.track__titleText}>
            <Link href={`/track/${trackId}`} className={styles.track__titleLink}>
              {formatTrackName(trackName)}
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link href={`/artist/${artistId}`} className={styles.track__authorLink}>
            {artist}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link href={`/album/${albumId}`} className={styles.track__albumLink}>
            {album}
          </Link>
        </div>
        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>{duration}</span>
        </div>
      </div>
    </div>
  );
}