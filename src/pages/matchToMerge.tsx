import React from 'react';

type UserProps = {
  name: string;
  strength: string;
  weakness: string;
};

// Extend the props type to include two users' data
type StudentPairProps = {
  user1: UserProps;
  user2: UserProps;
};

const StudentPairMatch: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      {/* User 1 */}
      <img src="./image/avatar.png" alt="User Avatar" className="w-24 h-24 rounded-full mb-4" />
      <div className="flex justify-between items-center w-full">
        <div className="bg-red-500 text-white px-4 py-2 rounded">
          <p>weakness</p>
        </div>
        <div className="bg-green-500 text-white px-4 py-2 rounded">
          <p>strength</p>
        </div>
      </div>

      {/* Arrows */}
      <div className="flex justify-between items-center w-full my-8">
        <div className="text-8xl transform rotate-180 my-4">&#8593;</div> {/* Arrow pointing down */}
        <div className="text-8xl my-4">&#8593;</div> {/* Arrow pointing up */}
      </div>

      {/* User 2 */}
      <img src="./image/avatar.png" alt="User Avatar" className="w-24 h-24 rounded-full mb-4" />
      <div className="flex justify-between items-center w-full">
        <div className="bg-green-500 text-white px-4 py-2 rounded">
          <p>strength</p>
        </div>
        <div className="bg-red-500 text-white px-4 py-2 rounded">
          <p>weakness</p>
        </div>
      </div>
    </div>
  );
};

export default StudentPairMatch;
