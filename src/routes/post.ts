import express = require('express');
import { Request, Response, NextFunction } from 'express';
import authorization from '../middlewares/authorization';
import Post, { IPost } from '../models/Post';
import util = require('../utils');
import { APIResponseProps } from '../types';

const postRouter = express.Router();

postRouter.post(
  '/',
  authorization,
  (req, res, next) =>
    util.checkRequest(req, res, next, ['content', 'user', 'title']),
  async (req: Request, res: Response<APIResponseProps<IPost>>) => {
    try {
      const post: IPost = await Post.create(req.body);

      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Post created succesfully!',
        data: post,
      });
    } catch (err: any) {
      return res.status(200).json({
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }
);

postRouter.get(
  '/',
  authorization,
  async (req: Request, res: Response<APIResponseProps<IPost[]>>) => {
    try {
      //@ts-ignore
      const { is_admin } = req.user_info;

      if (is_admin) {
        const posts: IPost[] = await Post.find();

        return res.status(200).json({
          status: 200,
          success: true,
          message: 'Posts fetched succesfully!',
          data: posts,
        });
      }

      const posts = await Post.find();

      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Posts fetched succesfully!',
        data: posts,
      });
    } catch (err: any) {
      return res.status(200).json({
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }
);

postRouter.delete(
  '/:id',
  authorization,
  async (req: Request, res: Response<APIResponseProps>) => {
    try {
      const { id } = req.params;
      //@ts-ignore
      const { user, is_admin } = req.user_info;

      let deletedPost: IPost | null;

      if (is_admin) {
        deletedPost = await Post.findByIdAndDelete(id);
      } else {
        deletedPost = await Post.findOneAndDelete({ _id: id, user });
      }

      if (!deletedPost) {
        return res.status(200).json({
          status: 400,
          success: false,
          message: 'Error: Something went wrong!',
        });
      }

      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Post deleted succeffully!',
      });
    } catch (err: any) {
      return res.status(200).json({
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }
);

postRouter.patch(
  '/:id',
  authorization,
  async (
    req: Request,
    res: Response<APIResponseProps<IPost>>,
    next: NextFunction
  ) => {
    try {
      await util.checkRequest(req, res, next, ['content', 'title']);

      const id = req.params.id;
      //@ts-ignore
      const { user } = req.user_info;
      const { content, title } = req.body;

      const post: IPost | null = await Post.findById(id);

      if (!post) {
        return res.status(200).json({
          status: 404,
          success: false,
          message: `Error: Post not found!`,
        });
      }

      const updatePost: IPost | null = await Post.findOneAndUpdate(
        { id, user },
        { content, title },
        { new: true }
      );

      if (!updatePost) {
        return res.status(200).json({
          status: 400,
          success: false,
          message: `Error: Something went wrong!`,
        });
      }

      return res.status(200).json({
        status: 200,
        success: true,
        message: `Post updated succeffully!`,
        data: updatePost,
      });
    } catch (err: any) {
      return res.status(200).json({
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }
);

export { postRouter };
