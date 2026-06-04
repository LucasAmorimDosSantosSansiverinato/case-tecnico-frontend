import axios from 'axios';
import { getToken, clearSession } from '../lib/auth';

const BFF_URL = import.meta.env.VITE_BFF_URL || 'http://localhost:3001';

const api = axios.create({ baseURL: BFF_URL });

// Injeta o JWT do usuário em toda requisição autenticada
api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`[FRONTEND] → ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

api.interceptors.response.use(
  response => {
    console.log(`[FRONTEND] ← ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  error => {
    // Token expirado ou inválido — limpa sessão e redireciona para login
    if (error.response?.status === 401) {
      clearSession();
      window.location.href = '/login';
    }
    console.error(
      `[FRONTEND] ✗ ${error.response?.status || 'NETWORK_ERR'} ${error.config?.url}`,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export const authService = {
  login: (login) => api.post('/api/auth/login', { login }).then(r => r.data),
};

export const personService = {
  register: (data) => api.post('/api/persons', data).then(r => r.data),
  getAll:   ()     => api.get('/api/persons').then(r => r.data),
  getById:  (id)   => api.get(`/api/persons/${id}`).then(r => r.data),
};

export const addressService = {
  // Busca endereço pelo CEP via BFF, que consulta o ViaCEP diretamente
  findByCep: (cep) => api.get(`/api/address/${cep.replace(/\D/g, '')}`).then(r => r.data),
};

export default api;
