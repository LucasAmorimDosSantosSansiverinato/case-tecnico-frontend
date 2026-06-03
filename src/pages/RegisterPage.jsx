import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PersonForm } from '../components/person/PersonForm';
import { SuccessResult } from '../components/person/SuccessResult';
import { Button } from '../components/ui/Button';
import styles from './RegisterPage.module.css';

function ItauLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill="#EC7000"/>
      <rect x="16.5" y="13" width="3" height="10" rx="1.5" fill="white"/>
      <circle cx="18" cy="11" r="1.5" fill="white"/>
    </svg>
  );
}

export default function RegisterPage() {
  const [registered, setRegistered] = useState(null);

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
          <Link to="/login">
            <Button variant="secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Fazer login
            </Button>
          </Link>
          <Link to="/persons">
            <Button variant="secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Ver todos
            </Button>
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <h1 className={styles.heading}>{registered ? 'Cadastro realizado' : 'Novo cadastro'}</h1>
        <p className={styles.subheading}>
          {registered ? 'Pessoa cadastrada com sucesso.' : 'Preencha os dados para cadastrar uma nova pessoa.'}
        </p>
        <div className={styles.card}>
          {registered ? (
            <SuccessResult person={registered} onRegisterAnother={() => setRegistered(null)} />
          ) : (
            <PersonForm onSuccess={setRegistered} />
          )}
        </div>
      </main>
    </div>
  );
}
