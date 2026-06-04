import PropTypes from 'prop-types';
import styles from './Card.module.css';

export function Card({ children, className = '' }) {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
