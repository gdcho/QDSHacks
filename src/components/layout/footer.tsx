import { LinkElement } from "../shared/footer/link-element";
import {
  Home,
  AccountCircle,
  AddToPhotos,
  AutoAwesome,
  GitHub as GitHubLogo,
  LinkedIn as LinkedinLogo,
} from "@mui/icons-material";
import { useRouter } from "next/router";

export const Footer = () => {
  const router = useRouter();

  return (
    <footer className="inset-x-0 bottom-0 w-full bg-no-repeat bg-top bg-cover sm:relative fixed">
      <div className="relative w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="pt-5 px-4 mt-5 border-t border-gray-200 dark:border-gray-700">
          {/* Header-like elements for mobile view */}
          <div className="flex flex-row sm:hidden justify-between gap-y-3">
            <Home onClick={() => router.push("/")} />
            <AddToPhotos onClick={() => router.push("/page")} />
            <AutoAwesome onClick={() => router.push("/page")} />
            <AccountCircle onClick={() => router.push("/profile")} />
          </div>

          <div className="hidden sm:flex sm:justify-between sm:items-center">
            <div className="flex items-center gap-x-3">
              <div className="space-x-4 text-sm ms-4">
                <LinkElement type="row" title="About" link="/" />
                <LinkElement type="row" title="Contact" link="/" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="space-x-4 ms-4">
                <LinkElement
                  link="https://www.linkedin.com/in/rjsgml/"
                  logo={<LinkedinLogo />}
                />
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
