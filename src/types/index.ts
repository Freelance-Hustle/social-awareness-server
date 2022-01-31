import { ObjectId } from 'mongoose';

export type APIResponseProps<T = any> = {
  message?: string;
  status: number;
  success: boolean;
  data?: T;
};

export type UserLoginProps = {
  token: string;
  user: {
    id: ObjectId;
    name: string;
    email: string;
    is_admin: boolean;
  };
};

export type AuthorizationPayloadProps = {
  user: ObjectId;
  is_admin: boolean;
};
