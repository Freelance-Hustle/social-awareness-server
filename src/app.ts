import express = require('express');
import { Request, Response } from 'express';
import './connect';
import cors = require('cors');
require('dotenv').config();
import { userRouter } from './routes/user';
import { postRouter } from './routes/post';

const app = express();
const PORT = process.env.PORT || 5000;
const version = process.env.version || 'v1';

//middleware
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept, x-requested-with");
})

app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/posts`, postRouter);

app.get('*', (_: Request, res: Response) => {
  res.send('<h1>Welcome to server apis</h1>');
  res.end();
});
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
