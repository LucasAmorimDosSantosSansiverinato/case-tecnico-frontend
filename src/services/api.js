import axios from 'axios';

const BFF_URL = import.meta.env.VITE_BFF_URL || 'http://localhost:3001';
console.log('[FRONTEND] BFF URL:', BFF_URL);

const api = axios.create({ baseURL: BFF_URL });

api.interceptors.request.use(config => {
  console.log(`[FRONTEND] → ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

api.interceptors.response.use(
  response => {
    console.log(`[FRONTEND] ← ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  error => {
    console.error(
      `[FRONTEND] ✗ ${error.response?.status || 'NETWORK_ERR'} ${error.config?.url}`,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export const personService = {
  register: (data) => api.post('/api/persons', data).then(r => r.data),
  getAll: () => api.get('/api/persons').then(r => r.data),
  getById: (id) => api.get(`/api/persons/${id}`).then(r => r.data),
  getByLogin: (login) => api.get(`/api/persons/login/${login}`).then(r => r.data)
};

export const addressService = {
  findByCep: (cep) => api.get(`/api/address/${cep.replace(/\D/g, '')}`).then(r => r.data)
};

export default api;
