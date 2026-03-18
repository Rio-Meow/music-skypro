import cn from 'classnames';
import styles from './PlaylistItem.module.css';

interface PlaylistItemProps {
  trackName?: string;
  artist?: string;
  album?: string;
  duration?: string;
}

export function PlaylistItem({ 
  trackName = "Guilt", 
  artist = "Nero", 
  album = "Welcome Reality", 
  duration = "4:44" 
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
            <a className={styles.track__titleLink} href="#">
              {formatTrackName(trackName)}
            </a>
          </div>
        </div>
        <div className={styles.track__author}>
          <a className={styles.track__authorLink} href="#">
            {artist}
          </a>
        </div>
        <div className={styles.track__album}>
          <a className={styles.track__albumLink} href="#">
            {album}
          </a>
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