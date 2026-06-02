import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PersonCard } from '../components/person/PersonCard';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { personService } from '../services/api';
import styles from './PersonListPage.module.css';

export default function PersonListPage() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    personService.getAll()
      .then(setPersons)
      .catch(() => setError('Erro ao carregar cadastros'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Cadastro de Pessoas</h1>
        <nav className={styles.nav}>
          <Link to="/">
            <Button variant="secondary">Novo cadastro</Button>
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <h2 className={styles.title}>Pessoas cadastradas</h2>

        {loading && <p className={styles.loading}>Carregando...</p>}
        {error && <Alert type="error">{error}</Alert>}

        <div className={styles.list}>
          {persons.map(person => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>

        {!loading && !error && persons.length === 0 && (
          <p className={styles.empty}>Nenhuma pessoa cadastrada ainda.</p>
        )}
      </main>
    </div>
  );
}
