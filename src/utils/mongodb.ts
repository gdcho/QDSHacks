import { MongoClient } from 'mongodb';

async function connectToDatabase() {
    const mongodbUri = process.env.MONGODB_URI;

    if (!mongodbUri) {
        throw new Error('MongoDB URI is not defined in environment variables');
    }

    const client = new MongoClient(mongodbUri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db();
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw error;
    }
}

export default connectToDatabase;
