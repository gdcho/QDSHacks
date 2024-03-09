import Link from "next/link";
import Image from "next/image";
// import { DarkMode, LightMode } from "@mui/icons-material";
// import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
  // const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full py-3 lg:py-0 bg-gray-800 shadow-sm">
      <nav
        className="w-full mx-auto px-4 lg:max-w-[85rem] lg:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="Brand"
            className="text-xl font-semibold dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <div className="relative h-10 w-[100px] max-w-full">
              <Image
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 30vw"
                className="object-contain !md:h-10 max-w-full"
                src="/image/site_logo.png"
                alt="Site_logo"
                priority
              />
            </div>
          </Link>

          <div
            className={
              "block md:flex md:w-auto w-full md:space-x-7 md:mt-0 md:ps-7"
            }
          >
            <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500">
              <div className="flex flex-col gap-y-3 mt-5 md:flex-row md:items-center md:justify-end md:gap-x-7 md:mt-0 md:ps-7 md:divide-y-0 md:divide-solid dark:divide-gray-700">
                <Link
                  className="font-medium text-gray-300 hover:text-gray-400 py-3 md:py-6 hidden md:flex"
                  href="/"
                >
                  Home
                </Link>

                <Link
                  className="font-medium text-gray-300 hover:text-gray-400 py-3 md:py-6 hidden md:flex"
                  href="/connect"
                >
                  Page
                </Link>

                <Link
                  className="font-medium text-gray-300 hover:text-gray-400 py-3 md:py-6 hidden md:flex"
                  href="/profile"
                >
                  Profile
                </Link>

                <div className="flex flex-row justify-end items-center space-x-3 sm:space-x-4 lg:space-x-5">
                  {!session ? (
                    <>
                      <button
                        onClick={() => router.push("/login")}
                        type="button"
                        className="mb-5 md:mb-0 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full bg-[#a2b8d3] hover:bg-[#75c09a] hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 text-gray-800"
                      >
                        Log-in
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        type="button"
                        className="mb-5 md:mb-0 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full bg-[#a2b8d3] hover:bg-[#75c09a] hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 text-gray-800"
                      >
                        Log-out
                      </button>
                    </>
                  )}
                  {/* <button
                    onClick={() =>
                      theme == "dark" ? setTheme("light") : setTheme("dark")
                    }
                    type="button"
                    className="mb-5 md:mb-0 py-1.5 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none text-gray-800"
                  >
                    {theme == "dark" ? (
                      <LightMode color="info" fontSize="medium" />
                    ) : (
                      <DarkMode color="info" fontSize="medium" />
                    )}
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
