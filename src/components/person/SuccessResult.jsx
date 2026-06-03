import { Button } from '../ui/Button';
import { PersonCard } from './PersonCard';
import styles from './SuccessResult.module.css';

export function SuccessResult({ person, onRegisterAnother }) {
  return (
    <div className={styles.container}>
      <div className={styles.loginBadge}>
        <div>
          <div className={styles.loginLabel}>Login gerado</div>
          <div className={styles.loginValue}>{person.login}</div>
        </div>
        <div className={styles.checkIcon}>✓</div>
      </div>
      <PersonCard person={person} />
      <Button variant="secondary" onClick={onRegisterAnother} style={{ width: '100%' }}>
        Cadastrar outra pessoa
      </Button>
    </div>
  );
}
