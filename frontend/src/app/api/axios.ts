import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    
    return config
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401 && !error.config.url.includes('/login')) {
    //   Cookies.remove('token');
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
)

export default api