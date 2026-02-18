import axios from 'axios';

// Axios 인스턴스
const api = axios.create({
//   baseURL: '/api',
  baseURL: 'http://192.168.0.11:4000/api', // 서버 주소
});

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// fetch wrapper
export async function apiFetch(url, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };

  return fetch(url, { ...options, headers });
}

export default api;
