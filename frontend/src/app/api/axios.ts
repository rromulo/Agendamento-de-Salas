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
    console.log('interceptor request lançado.')
    const token = Cookies.get('token')

    console.log('Valor do cookie token:', token) // Adicione esta linha

    if (token) {
      config.headers.Authorization = `${token}`;
      console.log('TOKEN INTERPTOR AQUI -->', config.headers.Authorization)
    } else {
      console.log('Nenhum token encontrado no cookie.') // Adicione esta linha
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
  }
)

export default api