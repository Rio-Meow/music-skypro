import styles from './Burger.module.css';

export function Burger() {
  return (
    <div className={styles.burger}>
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
    </div>
  );
}