import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

export const Input = forwardRef(function Input({ label, error, ...props }, ref) {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        ref={ref}
        className={`${styles.input} ${error ? styles.hasError : ''}`}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
};
