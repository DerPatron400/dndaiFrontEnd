"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/navigation/Footer";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { usePathname } from "next/navigation";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const Navbar = dynamic(() => import("@/components/shared/navigation/Navbar"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  const path = usePathname();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const hideNavs = path.includes("/login") || path.includes("/register");
  const hideFooter = path.includes("/game/play") || path.includes("/game/new");

  return (
    <html lang='en'>
      <GoogleTagManager gtmId='G-BTHMYX7TZ9' />
      <body className={inter.className}>
        <GoogleOAuthProvider clientId='1036030324483-ltg0nqpg0ectr5q3n7cfa66l7eq1ban8.apps.googleusercontent.com'>
          <div className='max-w-screen !overflow-hidden relative bg-black min-h-screen overflow-x-hidden'>
            <Theme>
              {!hideNavs && <Navbar />}
              {children}
              {!hideNavs && !hideFooter && <Footer />}
              <Toaster />
            </Theme>
          </div>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
