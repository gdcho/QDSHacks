import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import StressStatsDisplay from "./stressStatsDisplay";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mongo");
        const jsonData = await response.json();

        setUserData(jsonData);

        if (
          session &&
          !jsonData.some(
            (user: { user_id: string }) => user.user_id === session.user?.id
          )
        ) {
          try {
            await axios.post("/api/addUser", {
              user_id: session.user?.id,
              name: session.user?.name,
              session_email: session.user?.email,
            });
          } catch (error) {
            console.error("Error inserting user data:", error);
          }

          router.push("/profile");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [session, router]);

  return (
    <div>
      <br />
      <div className="px-4 md:px-0 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
        Welcome to <strong>StressBuddies</strong>
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-full text-2xl cursor-pointer"
            onClick={() => {
              if (session) {
                router.push("/match");
              } else {
                window.scrollTo(0, 500);
              }
            }}
          >
            Find your buddy
          </button>
        </div>
        <br></br>
        <div className="bg-gray-200 text-center p-4 mx-4 md:mx-0 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-800">
            At <strong>StressBuddies</strong> we aim to tackle the problem at
            the root cause. The main cause of stress in students comes from
            overloaded workload and hard assignments. That’s why your stress
            buddy can help you with your work, and you can help them with yours!
            We aim to reduce your stress, and enhance your well-being by
            tackling the root problem.
          </p>
        </div>
        <br></br>
        <div className="bg-green-200 text-center p-4 mx-4 md:mx-0 rounded-lg shadow-md my-8">
            <StressStatsDisplay />
          </div>
        <div className="flex flex-col space-y-8">
          {/* Step 1 Box */}
          <div className="bg-gray-200 text-center p-4 mx-4 md:mx-0 rounded-lg shadow-md">
            <p className="text-gray-600 dark:text-gray-800">
              Heres a guide for how to use <strong>StressBuddies</strong>! Please make sure to read all of it!
            </p>
          </div>
          <div className="bg-green-200 text-center p-4 mx-4 md:mx-0 rounded-lg shadow-md">
            <p><strong>Step 1:</strong> To get started, you would need to the profile page,
              and select your term.</p>

          </div>

          {/* Black line separator */}
          <div className="bg-black h-0.5 mx-4 md:mx-0"></div>

          {/* Step 2 Box */}
          <div className="bg-green-200 text-center p-4 mx-4 md:mx-0 rounded-lg shadow-md">
            <p><strong>Step 2:</strong> After selecting your term you can begin rating your knowledge level for each of your courses.</p>
            <img src="./image/Step2.png" alt="Step 2" className="mx-auto" />
          </div>

          {/* Black line separator */}
          <div className="bg-black h-0.5 mx-4 md:mx-0"></div>

          {/* Step 3 Box */}
          <div className="bg-green-200 text-center p-4 mx-4 md:mx-0 rounded-lg shadow-md">
            <p><strong>Step 3:</strong> After choosing your knowledge level for all classes, you can click on Home and click,
              Find Your Buddy button to find a work parter for you.</p>
            <img src="./image/Step3.png" alt="Step 3" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
