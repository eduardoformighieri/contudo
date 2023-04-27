import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

//api.defaults.headers.post['Content-Type'] = 'application/json'
api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
