import express from 'express';
import cors from 'cors';
import route from './routes';
import ErrorMiddleware from './middlewares/error';

const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://agendamento-de-salas-ibsdo2y35-rromulos-projects-93f3e61e.vercel.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-type', 'Accept', 'Authorization']
}));

app.use(route)

app.use(ErrorMiddleware)

app.get('/', (req, res) => res.status(200).send(''))


export default app;