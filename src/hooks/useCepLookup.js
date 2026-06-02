import { useState, useCallback } from 'react';
import { addressService } from '../services/api';

export function useCepLookup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lookup = useCallback(async (cep) => {
    const digits = cep.replace(/\D/g, '');
    if (digits.length !== 8) return null;

    setLoading(true);
    setError(null);
    try {
      const data = await addressService.findByCep(digits);
      return data;
    } catch (err) {
      const msg = err?.response?.data?.detail || 'CEP não encontrado';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { lookup, loading, error };
}
