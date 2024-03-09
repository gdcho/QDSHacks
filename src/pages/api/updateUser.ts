// pages/api/updateUser.ts

import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { user_id, name, session_email, program, term, option, courses } = req.body;

        const db = await connectToDatabase();
        const collection = db.collection('users');

        const result = await collection.updateOne(
            { user_id },
            { $set: { name, session_email, program, term, option, courses } }
        );

        if(result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User data updated successfully' });
    } catch (error) {
        console.error('Error updating user data:', error);
        return res.status(500).json({ message: 'Error updating user data' });
    }
}
