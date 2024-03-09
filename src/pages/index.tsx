import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/mongo');
        const jsonData = await response.json();

        setUserData(jsonData);

        console.log('Data received:', jsonData);

        if (session && !jsonData.some((user: { name: string | null | undefined; }) => user.name === session.user?.name)) {
          try {
            await axios.post('/api/addUser', { name: session.user?.name });
            console.log('User data inserted successfully');
          } catch (error) {
            console.error('Error inserting user data:', error);
          }

          router.push('/profile');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [session]);

  return (
    <div>
      <br />
      {!session ? (
        <p className="px-4 md:px-0 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Starter hack template for hackathons, created by David. This is the
          homepage. Start by editing{" "}
          <code className="font-mono font-bold">src/pages/index.tsx</code>
        </p>
      ) : (
        <p className="px-4 md:px-0 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Welcome back, {session.user?.name}! You are now logged in.
        </p>
      )}
    </div>
  );
}
