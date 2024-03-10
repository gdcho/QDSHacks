import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import Image from "next/image";

export default function GoogleLoginButton() {
  return (
    <>
      <div className="flex justify-center pt-10">
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="!text-white !bg-blue-500 hover:!bg-blue-700"
        sx={{
          py: 2,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
          gap: 1,
          mt: 6,
          borderRadius: 10,
        }}
      >
        <Google />
        Google Sign-in
      </Button>
    </>
  );
}
