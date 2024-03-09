import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

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
