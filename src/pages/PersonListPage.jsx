import { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSession } from '../lib/auth';
import { PersonCard } from '../components/person/PersonCard';
import { Button } from '../components/ui/Button';
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
  const navigate = useNavigate();
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(0);

  // Ref para permitir chamada recursiva dentro do intervalo sem referência circular
  const loadRef = useRef(null);

  useEffect(() => {
    if (!getSession()) navigate('/login', { replace: true });
  }, [navigate]);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    personService.getAll()
      .then(data => { setPersons(data); setLoading(false); })
      .catch(err => {
        const status = err?.response?.status;
        setLoading(false);
        if (status === 502 || status === 503 || !status) {
          setError('starting');
          let c = 15;
          setCountdown(c);
          const interval = setInterval(() => {
            c -= 1;
            setCountdown(c);
            if (c <= 0) {
              clearInterval(interval);
              loadRef.current?.();
            }
          }, 1000);
        } else {
          setError('generic');
        }
      });
  }, []);

  // Mantém a ref sempre atualizada com a versão mais recente do load
  useEffect(() => { loadRef.current = load; }, [load]);

  useEffect(() => { load(); }, [load]);

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

        {error === 'starting' && (
          <div className={styles.startingBox}>
            <div className={styles.startingIcon}>⏳</div>
            <div>
              <p className={styles.startingTitle}>Serviço iniciando</p>
              <p className={styles.startingText}>
                O servidor está acordando. Tentando novamente em <strong>{countdown}s</strong>...
              </p>
            </div>
            <Button variant="secondary" onClick={load} style={{ padding: '8px 16px', fontSize: '0.85rem', flexShrink: 0 }}>
              Tentar agora
            </Button>
          </div>
        )}

        {error === 'generic' && (
          <div className={styles.startingBox}>
            <div className={styles.startingIcon}>⚠️</div>
            <div>
              <p className={styles.startingTitle}>Erro ao carregar</p>
              <p className={styles.startingText}>Não foi possível buscar os dados.</p>
            </div>
            <Button variant="secondary" onClick={load} style={{ padding: '8px 16px', fontSize: '0.85rem', flexShrink: 0 }}>
              Tentar novamente
            </Button>
          </div>
        )}

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
