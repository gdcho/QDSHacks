import { LinkElement } from "../shared/footer/link-element";
import {
  Home,
  AccountCircle,
  ChatBubble,
  GitHub as GitHubLogo,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

export const Footer = () => {
  const router = useRouter();

  return (
    <footer className="sticky bottom-0 bg-gray-800 inset-x-0 w-full bg-no-repeat bg-top bg-cover sm:relative fixed">
      <div className="relative w-full max-w-[85rem] py-5 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="px-7">
          {/* Header-like elements for mobile view */}
          <div className="flex flex-row sm:hidden justify-between gap-y-2 text-white">
            <div className="flex flex-col items-center">
              <Home
                className="cursor-pointer"
                onClick={() => router.push("/")}
              />
              <small className="pt-1">Home</small>
            </div>
            <div className="flex flex-col items-center">
              <ChatBubble
                className="cursor-pointer"
                onClick={() => router.push("/connect")}
              />
              <small className="pt-1">Connect</small>
            </div>
            <div className="flex flex-col items-center">
              <AccountCircle
                className="cursor-pointer"
                onClick={() => router.push("/profile")}
              />
              <small className="pt-1">Profile</small>
            </div>
          </div>
          <div className="hidden sm:flex sm:justify-between sm:items-center">
            <div className="flex items-center gap-x-3">
              <div className="space-x-4 text-sm ms-4">
                <Typography variant="overline" color="gray">
                  QDS 2024 Team 6
                </Typography>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="space-x-4 ms-4">
                <LinkElement
                  link="https://www.github.com/gdcho/"
                  logo={<GitHubLogo />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
