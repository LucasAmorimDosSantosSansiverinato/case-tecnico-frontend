import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PersonCard } from '../components/person/PersonCard';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { personService } from '../services/api';
import styles from './PersonListPage.module.css';

function ItauLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill="#EC7000"/>
      <rect x="16.5" y="13" width="3" height="10" rx="1.5" fill="white"/>
      <circle cx="18" cy="11" r="1.5" fill="white"/>
    </svg>
  );
}

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
          <ItauLogo />
          <div>
            <div className={styles.logo}>Cadastro de Pessoas</div>
            <div className={styles.logoSub}>Itaú Personalité</div>
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
