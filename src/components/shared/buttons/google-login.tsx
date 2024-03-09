import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";

export default function GoogleLoginButton() {
    return (
      <Button
        variant="contained" 
        color="primary" 
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="!text-white !bg-blue-500 hover:!bg-blue-700" 
        sx={{
          py: 2,
          boxShadow: 'none', 
          '&:hover': {
            boxShadow: 'none',
          },
          gap: 1,
          mt: 10,
          borderRadius: 10,
        }}
      >
        <Google /> 
        Google Log-in
      </Button>
    );
};
