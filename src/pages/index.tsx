import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import StressStatsDisplay from './stressStatsDisplay';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/mongo');
        const jsonData = await response.json();

        setUserData(jsonData);

        console.log('Data received:', jsonData);
        

        if (session && !jsonData.some((user: { user_id: string; }) => user.user_id === session.user?.id)) {
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
          Welcome to <strong>StressBuddies</strong>!
          <div className="flex justify-center mt-4">
            
            <div className="relative h-40 w-80"> 
              <Image
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 30vw"
                className="object-contain" 
                src="/image/site_logo.png"
                alt="Site logo"
                priority
              />
            </div>
            </div>
            <div className="flex flex-col items-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg text-2xl cursor-pointer"
              onClick={() => router.push('/match')}
            >
              Find your buddy!
            </button>
          </div>
            <br></br>
            <div className="bg-gray-200 text-center p-4 mx-4 md:mx-0 rounded-lg shadow-md">
            <p className="text-gray-600 dark:text-gray-800">
              At <strong>StressBuddies</strong> we aim to tackle the problem at the root cause.
              The main cause of stress in students comes from overloaded workload and hard assignments.
              That’s why your stress buddy can help you with your work, and you can help them with yours!
              We aim to reduce your stress, and enhance your well-being by tackling the root problem.
            </p>
          </div>
          <br></br>
          <div className="bg-green-200 text-center p-4 mx-4 md:mx-0 rounded-lg shadow-md my-8">
            <StressStatsDisplay />
          </div>
        </p>
        
      )}
    </div>
  );
}
