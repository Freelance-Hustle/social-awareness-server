import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { APIResponseProps, AuthorizationPayloadProps } from '../types';
require('dotenv').config();

const authorization = async (
  req: Request,
  res: Response<APIResponseProps>,
  next: NextFunction
): Promise<Response<APIResponseProps> | undefined> => {
  try {
    const authorization = req.headers.authorization?.split(' ');

    if (authorization?.[0] !== 'Bearer') {
      return res.status(200).json({
        status: 401,
        success: false,
        message: 'Error: Invalid authorization token',
      });
    }

    const token = authorization?.[1];

    if (!token) {
      return res.status(200).json({
        status: 401,
        success: false,
        message: 'Error: Not authorized',
      });
    } else {
      await jwt.verify(
        token,
        process.env.JWT_SECRET ?? '',
        (err: any, verified?: JwtPayload | string) => {
          if (err) {
            return res.status(200).json({
              status: 401,
              success: false,
              message: 'Error: Invalid token or already expired',
            });
          } else if (verified) {
            const payload: AuthorizationPayloadProps = {
              //@ts-ignore
              user: verified.id,
              //@ts-ignore
              is_admin: verified.is_admin,
            };

            //@ts-ignore
            req.user_info = payload;

            next();
          } else {
            return res.status(200).json({
              status: 401,
              success: false,
              message: 'Error: Invalid token or already expired!',
            });
          }
        }
      );
    }
  } catch (err: any) {
    return res.status(200).json({
      status: 500,
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

export default authorization;
