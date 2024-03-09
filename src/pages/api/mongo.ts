import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        res.status(500).json({ message: 'Failed to connect to MongoDB' });
    }
}
