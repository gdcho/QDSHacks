import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { Header } from "@/components/layout/header";
// import { Footer } from "@/components/layout/footer";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <SessionProvider session={pageProps.session}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <div>
              {/* <Header /> */}
              <div className="min-h-screen max-w-screen-2xl mx-auto">
                <Component {...pageProps} />
              </div>
              {/* <Footer /> */}
            </div>
          </NextThemesProvider>
        </NextUIProvider>
      </SessionProvider>
    </>
  );
}