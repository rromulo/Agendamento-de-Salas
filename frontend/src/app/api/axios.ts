import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';



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
    if (error.response?.status === 401) {
      const router = useRouter();
      router.push('/agendamentos')
    }
    return Promise.reject(error); // Esta linha está faltando
  }
)

export default api