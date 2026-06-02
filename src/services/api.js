import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BFF_URL || 'http://localhost:3001'
});

export const personService = {
  register: (data) => api.post('/api/persons', data).then(r => r.data),
  getAll: () => api.get('/api/persons').then(r => r.data),
  getById: (id) => api.get(`/api/persons/${id}`).then(r => r.data)
};

export const addressService = {
  findByCep: (cep) => api.get(`/api/address/${cep.replace(/\D/g, '')}`).then(r => r.data)
};

export default api;
