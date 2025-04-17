import mongoose from 'mongoose';
import { envs } from './envs.config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(envs.dbUri);

    console.log('Db connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
