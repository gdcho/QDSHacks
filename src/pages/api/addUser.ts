// pages/api/addUser.ts

import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { user_id, name, session_email } = req.body;

        const db = await connectToDatabase();
        const collection = db.collection('users');

        await collection.insertOne({ user_id, name, session_email });

        return res.status(200).json({ message: 'User data inserted successfully' });
    } catch (error) {
        console.error('Error inserting user data:', error);
        return res.status(500).json({ message: 'Error inserting user data' });
    }
}
