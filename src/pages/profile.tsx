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
      {session && <ProfileForm />}
    </div>
  );
}
