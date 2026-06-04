import PropTypes from 'prop-types';
import styles from './Alert.module.css';

export function Alert({ type = 'error', children }) {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {children}
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};
