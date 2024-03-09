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
            console.log('Session:', session);
            await axios.post('/api/addUser', {
              user_id: session.user?.id,
              name: session.user?.name,
              session_email: session.user?.email
            });
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
  }, [session, router]);

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
