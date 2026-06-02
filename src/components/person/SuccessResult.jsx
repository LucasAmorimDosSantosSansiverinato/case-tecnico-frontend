import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { PersonCard } from './PersonCard';
import styles from './SuccessResult.module.css';

export function SuccessResult({ person, onRegisterAnother }) {
  return (
    <div className={styles.container}>
      <Alert type="success">
        Pessoa cadastrada com sucesso! Login gerado: <strong>{person.login}</strong>
      </Alert>
      <PersonCard person={person} />
      <Button variant="secondary" onClick={onRegisterAnother}>
        Cadastrar outra pessoa
      </Button>
    </div>
  );
}
