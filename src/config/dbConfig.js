import mongoose from 'mongoose';
import 'dotenv/config';

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
    throw new Error("DB_URL is not defined in environment variables");
}

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};
