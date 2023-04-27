import axios from 'axios';
import { getToken } from '../utils/tokenStorage';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

//api.defaults.headers.post['Content-Type'] = 'application/json'
api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
