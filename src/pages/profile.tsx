import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ProfileForm from "./profile/profile-form";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      {session && (
        <p className="px-4 md:px-0 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Profile name: {session.user?.name}
          <br />
          Profile email: {session.user?.email}
        </p>
      )}
      <ProfileForm />
    </div>
  );
}
