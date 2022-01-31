import mongoose = require('mongoose');

export interface IUser {
  id: mongoose.ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean },
  },
  { collection: 'users', timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
