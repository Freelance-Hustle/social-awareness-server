import mongoose = require('mongoose');

export interface IPost {
  title?: string;
  content: string;
  user: mongoose.Types.ObjectId;
  isApproved: boolean;
}

const postSchema: mongoose.Schema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    isApproved: { type: Boolean, required: true, default: false },
  },
  { collection: 'posts', timestamps: true }
);

export default mongoose.model<IPost>('Post', postSchema);
