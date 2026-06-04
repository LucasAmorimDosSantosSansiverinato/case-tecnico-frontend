import styles from './PersonCard.module.css';

export function PersonCard({ person }) {
  const end = person.endereco || person.address || {};
  const addr = [
    end.logradouro || end.street,
    end.numero     || end.number,
    end.cidade     || end.city,
    end.estado     || end.state
  ].filter(Boolean).join(', ');

  const nome      = person.nomeCompleto || person.fullName;
  const cpf       = person.cpf          || person.document;
  const nascimento= person.dataNascimento|| person.birthDate;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{nome}</span>
        <span className={styles.login}>{person.login}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.field}><span className={styles.fieldLabel}>CPF</span><span className={styles.fieldValue}>{cpf}</span></div>
        <div className={styles.field}><span className={styles.fieldLabel}>E-mail</span><span className={styles.fieldValue}>{person.email}</span></div>
        <div className={styles.field}><span className={styles.fieldLabel}>Nascimento</span><span className={styles.fieldValue}>{nascimento ? new Date(nascimento + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}</span></div>
        <div className={styles.field}><span className={styles.fieldLabel}>Endereço</span><span className={styles.fieldValue}>{addr || '—'}</span></div>
      </div>
    </div>
  );
}
