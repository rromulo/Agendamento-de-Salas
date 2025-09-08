import express from 'express';
import cors from 'cors';
import {userRouter} from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter)
app.get('/', (req, res) => res.status(200).send('Deu certo'))


export default app;