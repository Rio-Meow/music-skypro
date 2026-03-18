import cn from 'classnames';
import styles from './Filter.module.css';

export function Filter() {
  const filters = ['исполнителю', 'году выпуска', 'жанру'];
  
  return (
    <div className={styles.filter}>
      <div className={styles.filter__title}>Искать по:</div>
      {filters.map((filter, index) => (
        <div key={index} className={cn(styles.filter__button, styles.btn)}>
          {filter}
        </div>
      ))}
    </div>
  );
}