import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const fetchApiStatus = async () => {
  const response = await api.get('/');
  return response.data;
};

export const fetchApiData = async () => {
  const response = await api.get('/data');
  return response.data;
};

export type ApiStatusResponse = {
  message: string;
  status: string;
  timestamp: string;
};

export type ApiDataResponse = {
  message: string;
  timestamp: string;
};

export interface GridData {
  id: number;
  name: string;
  value: number;
  category: string;
  timestamp: string;
}

export const fetchGridData = async (): Promise<GridData[]> => {
  const response = await api.get('/data');
  return response.data.items; // Asegúrate que tu backend devuelve { items: GridData[] }
};

