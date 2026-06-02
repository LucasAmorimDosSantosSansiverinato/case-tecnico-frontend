import styles from './Alert.module.css';

export function Alert({ type = 'error', children }) {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {children}
    </div>
  );
}
