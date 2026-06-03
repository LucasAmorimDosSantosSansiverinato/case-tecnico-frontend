import styles from './PersonCard.module.css';

export function PersonCard({ person }) {
  const addr = [person.address?.street, person.address?.number, person.address?.city, person.address?.state].filter(Boolean).join(', ');
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{person.fullName}</span>
        <span className={styles.login}>{person.login}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.field}><span className={styles.fieldLabel}>CPF</span><span className={styles.fieldValue}>{person.document}</span></div>
        <div className={styles.field}><span className={styles.fieldLabel}>E-mail</span><span className={styles.fieldValue}>{person.email}</span></div>
        <div className={styles.field}><span className={styles.fieldLabel}>Nascimento</span><span className={styles.fieldValue}>{new Date(person.birthDate + 'T00:00:00').toLocaleDateString('pt-BR')}</span></div>
        <div className={styles.field}><span className={styles.fieldLabel}>Endereço</span><span className={styles.fieldValue}>{addr || '—'}</span></div>
      </div>
    </div>
  );
}
