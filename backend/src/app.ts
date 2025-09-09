import express from 'express';
import cors from 'cors';
import route from './routes';
import ErrorMiddleware from './middlewares/error';

const app = express();

app.use(express.json());
app.use(cors());

app.use(route)

app.use(ErrorMiddleware)

app.get('/', (req, res) => res.status(200).send(''))


export default app;