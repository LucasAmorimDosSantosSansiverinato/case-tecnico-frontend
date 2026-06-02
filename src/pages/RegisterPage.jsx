import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { PersonForm } from '../components/person/PersonForm';
import { SuccessResult } from '../components/person/SuccessResult';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const [registered, setRegistered] = useState(null);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Cadastro de Pessoas</h1>
        <nav className={styles.nav}>
          <Link to="/persons">Ver cadastros</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <Card className={styles.card}>
          <h2 className={styles.cardTitle}>
            {registered ? 'Cadastro realizado' : 'Nova pessoa'}
          </h2>

          {registered ? (
            <SuccessResult
              person={registered}
              onRegisterAnother={() => setRegistered(null)}
            />
          ) : (
            <PersonForm onSuccess={setRegistered} />
          )}
        </Card>
      </main>
    </div>
  );
}
