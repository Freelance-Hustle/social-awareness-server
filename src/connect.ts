import mongoose from 'mongoose';
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI ?? '')
  .catch(err => console.log(err.reason));

const db = mongoose.connection;

db.once('open', () => console.log('Database connected successfully!'));

export default db;
