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
        <div className={styles.logoWrap}>
          <div className={styles.logoIcon}>P</div>
          <div>
            <div className={styles.logo}>Personalité</div>
            <div className={styles.logoSub}>Cadastro de Pessoas</div>
          </div>
        </div>
        <nav className={styles.nav}>
          <Link to="/">
            <Button variant="secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Novo cadastro
            </Button>
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <h1 className={styles.heading}>Pessoas cadastradas</h1>
        <p className={styles.subheading}>Todos os registros do sistema</p>

        {loading && <p className={styles.loading}>Carregando...</p>}
        {error && <Alert type="error">{error}</Alert>}

        <div className={styles.list}>
          {persons.map(p => <PersonCard key={p.id} person={p} />)}
        </div>

        {!loading && !error && persons.length === 0 && (
          <p className={styles.empty}>Nenhuma pessoa cadastrada ainda.</p>
        )}
      </main>
    </div>
  );
}
