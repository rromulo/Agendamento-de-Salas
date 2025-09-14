import express from 'express';
import cors from 'cors';
import route from './routes';
import ErrorMiddleware from './middlewares/error';

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-type', 'Accept', 'Authorization']
}));

app.use(route)

app.use(ErrorMiddleware)

app.get('/', (req, res) => res.status(200).send(''))


export default app;