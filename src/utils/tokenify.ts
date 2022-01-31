import { ObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';
require('dotenv').config();

type TokenProps = {
  id: ObjectId;
  is_admin: boolean;
};

type PayloadProps = TokenProps;

const tokenify = (user: TokenProps): string => {
  const payload: PayloadProps = {
    id: user.id,
    is_admin: user.is_admin,
  };

  return jwt.sign(payload, process.env.JWT_SECRET ?? '', { expiresIn: '7d' });
};

export { tokenify };
