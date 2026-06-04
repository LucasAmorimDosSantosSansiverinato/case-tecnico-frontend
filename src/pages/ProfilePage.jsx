import { useLocation, useNavigate } from 'react-router-dom';
import { PersonCard } from '../components/person/PersonCard';
import { Button } from '../components/ui/Button';
import { clearSession } from '../lib/auth';
import styles from './ProfilePage.module.css';

function ItauLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill="#EC7000"/>
      <rect x="16.5" y="13" width="3" height="10" rx="1.5" fill="white"/>
      <circle cx="18" cy="11" r="1.5" fill="white"/>
    </svg>
  );
}

export default function ProfilePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const person = state?.person;

  if (!person) {
    navigate('/login');
    return null;
  }

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
          <Button variant="secondary" onClick={() => { clearSession(); navigate('/login'); }} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            Sair
          </Button>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.welcomeBox}>
          <div className={styles.welcomeIcon}>👤</div>
          <div>
            <div className={styles.welcomeTitle}>Olá, {(person.nomeCompleto || person.fullName || '').split(' ')[0]}</div>
            <div className={styles.welcomeSub}>Login: <span className={styles.loginBadge}>{person.login}</span></div>
          </div>
        </div>

        <h2 className={styles.heading}>Seus dados cadastrados</h2>
        <PersonCard person={person} />

        <div className={styles.actions}>
          <Button variant="secondary" onClick={() => navigate('/')} style={{ flex: 1 }}>
            Novo cadastro
          </Button>
          <Button variant="secondary" onClick={() => navigate('/persons')} style={{ flex: 1 }}>
            Ver todos
          </Button>
        </div>
      </main>
    </div>
  );
}
