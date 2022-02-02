import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { APIResponseProps, UserLoginProps } from '../types';
import { IUser } from '../models/User';
import { Tokenify } from '../utils/tokenify';
export module User {
	const express = require('express');
	const tokenify = Tokenify.tokenify;
	const util = require('../utils');
	const User = require('../models/User');

	export const userRouter = express.Router();

	userRouter.get('/', (_: Request, res: Response<APIResponseProps>) => {
		return res.status(200).json({
			status: 200,
			success: true,
			message: 'Welcome user',
		});
	});

	userRouter.post(
		'/register',
		(req, res, next) =>
			util.checkRequest(req, res, next, ['name', 'email', 'password']),
		async (req: Request, res: Response<APIResponseProps<UserLoginProps>>) => {
			try {
				const { name, email, password } = req.body;

				const validEmail = util.validateEmail(email);

				if (!validEmail) {
					return res.status(200).json({
						status: 400,
						success: false,
						message: 'Email address provided is invalid!',
					});
				}

				const user: IUser | null = await User.findOne({ email });

				if (user) {
					res.status(200).json({
						status: 409,
						success: false,
						message: 'Email address already exists!',
					});
				}

				const hashedPassword = await bcrypt.hash(password, 10);

				const newUser: IUser = await User.create({
					name: util.capitalize(name),
					email,
					password: hashedPassword,
				});

				const token = await tokenify({
					id: newUser.id,
					is_admin: newUser.isAdmin,
				});

				return res.status(200).json({
					status: 200,
					success: true,
					message: 'User registered successfully!',
					data: {
						token,
						user: {
							id: newUser.id,
							name: newUser.name,
							email: newUser.email,
							is_admin: newUser.isAdmin,
						},
					},
				});
			} catch (err: unknown) {
				return res.status(200).json({
					status: 500,
					success: false,
					//@ts-ignore
					message: err?.message ?? 'Error: something went wrong!',
				});
			}
		}
	);

	userRouter.post(
		'/login',
		(req, res, next) =>
			util.checkRequest(req, res, next, ['email', 'password']),
		async (req: Request, res: Response<APIResponseProps<UserLoginProps>>) => {
			try {
				const { email, password } = req.body;

				const validEmail = util.validateEmail(email);

				if (!validEmail) {
					return res.status(200).json({
						status: 400,
						success: false,
						message: 'Email address provided is invalid!',
					});
				}

				const user: IUser | null = await User.findOne({ email });

				if (!user) {
					res.status(200).json({
						status: 404,
						success: false,
						message: 'Email address does not exist!',
					});
				} else {
					const validPassword = await bcrypt.compare(password, user.password);

					if (!validPassword) {
						res.status(200).json({
							status: 400,
							success: false,
							message: 'Email address or password incorrect!',
						});
					}

					const token = await tokenify({
						id: user.id,
						is_admin: user.isAdmin,
					});

					return res.status(200).json({
						status: 200,
						success: true,
						message: 'User logged in successfully!',
						data: {
							token,
							user: {
								id: user.id,
								name: user.name,
								email: user.email,
								is_admin: user.isAdmin,
							},
						},
					});
				}
			} catch (err: unknown) {
				return res.status(200).json({
					status: 500,
					success: false,
					//@ts-ignore
					message: err?.message ?? 'Error: something went wrong!',
				});
			}
		}
	);
}

// export default userRouter;
//   export {};
