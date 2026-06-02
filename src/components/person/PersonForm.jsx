import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { formatCpf, formatCep, extractApiError } from '../../lib/utils';
import { useCepLookup } from '../../hooks/useCepLookup';
import { personService } from '../../services/api';
import styles from './PersonForm.module.css';

export function PersonForm({ onSuccess }) {
  const { register, handleSubmit, setValue, watch, formState: { errors }, setError } = useForm();
  const { lookup, loading: cepLoading, error: cepError } = useCepLookup();
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const cepValue = watch('cep', '');

  // Auto-fill address when CEP is fully typed
  useEffect(() => {
    const digits = cepValue.replace(/\D/g, '');
    if (digits.length === 8) {
      lookup(digits).then(addr => {
        if (addr) {
          setValue('street', addr.street);
          setValue('neighborhood', addr.neighborhood);
          setValue('city', addr.city);
          setValue('state', addr.state);
        }
      });
    }
  }, [cepValue]);

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
      setApiError(extractApiError(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {apiError && <Alert type="error">{apiError}</Alert>}

      <div className={styles.row}>
        <Input
          label="Nome completo *"
          placeholder="Ex: Maria Silva Souza"
          error={errors.fullName?.message}
          {...register('fullName', {
            required: 'Nome completo é obrigatório',
            pattern: {
              value: /^[a-zA-Z ]{2,}( [a-zA-Z ]+)+$/,
              message: 'Use apenas letras e espaços, sem acentos'
            }
          })}
        />
      </div>

      <div className={styles.row2}>
        <Input
          label="CPF *"
          placeholder="000.000.000-00"
          maxLength={14}
          error={errors.document?.message}
          {...register('document', {
            required: 'CPF é obrigatório',
            onChange: (e) => {
              e.target.value = formatCpf(e.target.value);
            },
            validate: v => v.replace(/\D/g, '').length === 11 || 'CPF deve ter 11 dígitos'
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
            validate: v => new Date(v) <= new Date() || 'Data não pode ser futura'
          })}
        />

        <div>
          <Input
            label="CEP *"
            placeholder="00000-000"
            maxLength={9}
            error={errors.cep?.message || cepError}
            {...register('cep', {
              required: 'CEP é obrigatório',
              onChange: (e) => { e.target.value = formatCep(e.target.value); },
              validate: v => v.replace(/\D/g, '').length === 8 || 'CEP deve ter 8 dígitos'
            })}
          />
          {cepLoading && <span className={styles.cepHint}>Buscando endereço...</span>}
        </div>
      </div>

      <div className={styles.row}>
        <Input
          label="Logradouro"
          readOnly
          placeholder="Preenchido automaticamente"
          {...register('street')}
        />
      </div>

      <div className={styles.row3}>
        <Input label="Bairro" readOnly {...register('neighborhood')} />
        <Input label="Cidade" readOnly {...register('city')} />
        <Input label="UF" readOnly style={{ maxWidth: 80 }} {...register('state')} />
      </div>

      <div className={styles.row2}>
        <Input label="Número" placeholder="Ex: 100" {...register('number')} />
        <Input label="Complemento" placeholder="Ex: Apto 12" {...register('complement')} />
      </div>

      <Button type="submit" loading={submitting} style={{ marginTop: 8 }}>
        Cadastrar pessoa
      </Button>
    </form>
  );
}
