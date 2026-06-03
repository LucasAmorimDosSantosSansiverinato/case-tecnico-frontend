import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PersonForm } from '../components/person/PersonForm';
import { SuccessResult } from '../components/person/SuccessResult';
import { Button } from '../components/ui/Button';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const [registered, setRegistered] = useState(null);

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
          <Link to="/persons">
            <Button variant="secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Ver cadastros
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
