import styles from './Input.module.css';

export function Input({ label, error, ...props }) {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={`${styles.input} ${error ? styles.hasError : ''}`} {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
