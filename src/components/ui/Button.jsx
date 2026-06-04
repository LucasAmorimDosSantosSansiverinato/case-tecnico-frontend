import PropTypes from 'prop-types';
import styles from './Button.module.css';

export function Button({ children, variant = 'primary', loading, ...props }) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};
