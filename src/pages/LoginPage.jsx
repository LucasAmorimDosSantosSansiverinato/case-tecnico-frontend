import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { personService } from '../services/api';
import { saveSession } from '../lib/auth';
import styles from './LoginPage.module.css';

function ItauLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill="#EC7000"/>
      <rect x="16.5" y="13" width="3" height="10" rx="1.5" fill="white"/>
      <circle cx="18" cy="11" r="1.5" fill="white"/>
    </svg>
  );
}

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = login.trim().toLowerCase();
    if (!trimmed || trimmed.length !== 7 || !/^[a-z]{7}$/.test(trimmed)) {
      setError('O login deve ter exatamente 7 letras minúsculas.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const person = await personService.getByLogin(trimmed);
      saveSession(person);
      navigate('/perfil', { state: { person } });
    } catch (err) {
      const status = err?.response?.status;
      if (status === 404 || status === 422) {
        setError('Login não encontrado. Verifique e tente novamente.');
      } else if (status === 502 || status === 503 || !status) {
        setError('Servidor iniciando, aguarde alguns segundos e tente novamente.');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <ItauLogo />
          <div>
            <div className={styles.title}>Cadastro de Pessoas</div>
            <div className={styles.subtitle}>Itaú Personalité</div>
          </div>
        </div>

        <h2 className={styles.heading}>Acesse sua conta</h2>
        <p className={styles.desc}>Digite o login gerado no seu cadastro para visualizar seus dados.</p>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label className={styles.label}>Seu login</label>
            <input
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              type="text"
              placeholder="Ex: mariasi"
              maxLength={7}
              value={login}
              onChange={e => { setLogin(e.target.value.toLowerCase()); setError(null); }}
              autoFocus
            />
            {error && <span className={styles.error}>{error}</span>}
          </div>

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : 'Entrar'}
          </button>
        </form>

        <div className={styles.links}>
          <a href="/">Novo cadastro</a>
          <span>·</span>
          <a href="/persons">Ver todos os cadastros</a>
        </div>
      </div>
    </div>
  );
}
