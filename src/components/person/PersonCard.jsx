import styles from './PersonCard.module.css';

export function PersonCard({ person }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{person.fullName}</span>
        <span className={styles.login}>{person.login}</span>
      </div>
      <div className={styles.body}>
        <Field label="CPF" value={person.document} />
        <Field label="E-mail" value={person.email} />
        <Field label="Nascimento" value={new Date(person.birthDate + 'T00:00:00').toLocaleDateString('pt-BR')} />
        <Field
          label="Endereço"
          value={[person.address?.street, person.address?.number, person.address?.city, person.address?.state]
            .filter(Boolean).join(', ')}
        />
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}:</span>
      <span>{value}</span>
    </div>
  );
}
