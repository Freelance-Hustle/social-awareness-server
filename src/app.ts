'use strict';
import { Request, Response } from 'express';
import { Post } from './routes/post';
import { User } from './routes/user';

export module App {
	const express = require('express');
	require('./connect');
	const cors = require('cors');
	require('dotenv').config();

	const app = express();
	const PORT = process.env.PORT || '5000';
	const version = process.env.version || 'v1';

	//middleware
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use(`/api/v1/users`, User.userRouter);
	app.use(`/api/v1/posts`, Post.postRouter);

	app.get('*', (_: Request, res: Response) => {
		res.send('<h1>Welcome to server apis</h1>');
		res.end();
	});
	app.listen(PORT, () =>
		console.log(`Server running at http://localhost:${PORT}`)
	);
}
