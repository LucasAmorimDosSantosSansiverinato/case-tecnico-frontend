import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { personService } from '../../services/api';
import styles from './PersonForm.module.css';

function formatCpf(v) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return d.slice(0,3) + '.' + d.slice(3);
  if (d.length <= 9) return d.slice(0,3) + '.' + d.slice(3,6) + '.' + d.slice(6);
  return d.slice(0,3) + '.' + d.slice(3,6) + '.' + d.slice(6,9) + '-' + d.slice(9);
}

function formatCep(v) {
  const d = v.replace(/\D/g, '').slice(0, 8);
  if (d.length <= 5) return d;
  return d.slice(0,5) + '-' + d.slice(5);
}

export function PersonForm({ onSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit' });
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  async function onSubmit(data) {
    setSubmitting(true);
    setApiError(null);
    try {
      const result = await personService.register({
        fullName: data.fullName.trim(),
        document: data.document.replace(/\D/g, ''),
        email: data.email.trim(),
        birthDate: data.birthDate,
        cep: data.cep.replace(/\D/g, ''),
        complement: data.complement || null,
        number: data.number || null
      });
      onSuccess(result);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 502 || status === 503 || !status) {
        setApiError('Servidor iniciando, aguarde alguns segundos e tente novamente.');
      } else {
        const d = err?.response?.data;
        if (d?.errors) setApiError(Object.values(d.errors).join(', '));
        else setApiError(d?.detail || d?.title || 'Erro ao cadastrar. Tente novamente.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {apiError && <Alert type="error">{apiError}</Alert>}

      <Input
        label="Nome completo *"
        placeholder="Ex: Maria Silva Souza"
        error={errors.fullName?.message}
        {...register('fullName', {
          required: 'Nome completo é obrigatório',
          pattern: { value: /^[a-zA-Z ]{2,}( [a-zA-Z ]+)+$/, message: 'Use apenas letras sem acentos. Mínimo nome e sobrenome.' }
        })}
      />

      <div className={styles.row2}>
        <Input
          label="CPF *"
          placeholder="000.000.000-00"
          maxLength={14}
          error={errors.document?.message}
          {...register('document', {
            required: 'CPF é obrigatório',
            validate: v => v.replace(/\D/g,'').length === 11 || 'CPF deve ter 11 dígitos',
            onChange: e => { e.target.value = formatCpf(e.target.value); }
          })}
        />
        <Input
          label="E-mail *"
          type="email"
          placeholder="email@exemplo.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'E-mail é obrigatório',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail inválido' }
          })}
        />
      </div>

      <div className={styles.row2}>
        <Input
          label="Data de nascimento *"
          type="date"
          max={new Date().toISOString().split('T')[0]}
          error={errors.birthDate?.message}
          {...register('birthDate', {
            required: 'Data de nascimento é obrigatória',
            validate: v => !v || new Date(v) <= new Date() || 'Data não pode ser futura'
          })}
        />
        <Input
          label="CEP *"
          placeholder="00000-000"
          maxLength={9}
          error={errors.cep?.message}
          {...register('cep', {
            required: 'CEP é obrigatório',
            validate: v => v.replace(/\D/g,'').length === 8 || 'CEP deve ter 8 dígitos',
            onChange: e => { e.target.value = formatCep(e.target.value); }
          })}
        />
      </div>

      <Input label="Logradouro" placeholder="Rua, Avenida..." {...register('street')} />

      <div className={styles.row3}>
        <Input label="Bairro" placeholder="Bairro" {...register('neighborhood')} />
        <Input label="Cidade" placeholder="Cidade" {...register('city')} />
        <Input label="UF" placeholder="SP" maxLength={2} {...register('state')} />
      </div>

      <div className={styles.row2}>
        <Input label="Número" placeholder="100" {...register('number')} />
        <Input label="Complemento" placeholder="Apto 12" {...register('complement')} />
      </div>

      <Button type="submit" loading={submitting} style={{ width: '100%', marginTop: 8 }}>
        Cadastrar
      </Button>
    </form>
  );
}
