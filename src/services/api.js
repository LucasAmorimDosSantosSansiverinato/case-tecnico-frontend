import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
console.log('[FRONTEND] Backend URL:', BACKEND_URL);

const api = axios.create({ baseURL: BACKEND_URL });

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
  register: (data) => api.post('/api/v1/persons', data).then(r => r.data),
  getAll: () => api.get('/api/v1/persons').then(r => r.data),
  getById: (id) => api.get(`/api/v1/persons/${id}`).then(r => r.data)
};

export const addressService = {
  findByCep: (cep) => api.get(`/api/v1/address/${cep.replace(/\D/g, '')}`).then(r => r.data)
};

export default api;
