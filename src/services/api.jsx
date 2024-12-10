import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE.VITE_APP_URL,
});
export const login = (credentials) => API.post('/login', credentials);
export const register = (data) => API.post('/register', data);
export const getItems = () => API.get('/items');
export const addItem = (item) => API.post('/items', item);
export const updateItem = (id, updatedItem) => API.put(`/items/${id}`, updatedItem);
export const deleteItem = (id) => API.delete(`/items/${id}`);
