// pages/newUser.tsx

import { useState } from 'react';
import axios from 'axios';

export default function NewUserPage() {
    const [name, setName] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            await axios.post('/api/addUser', { name });

            console.log('User data inserted successfully');
        } catch (error) {
            console.error('Error inserting user data:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <div>
            <h1>Add New User</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
