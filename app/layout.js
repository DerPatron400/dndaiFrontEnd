"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/navigation/Footer";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { usePathname } from "next/navigation";
import { GoogleTagManager } from "@next/third-parties/google";

import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const Navbar = dynamic(() => import("@/components/shared/navigation/Navbar"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  const path = usePathname();

  const hideNavs = path.includes("/login") || path.includes("/register");

  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-BTHMYX7TZ9" />
      <body className={inter.className}>
        <div className="max-w-screen !overflow-hidden bg-black overflow-x-hidden">
          <Theme>
            {!hideNavs && <Navbar />}
            <div className="min-h-screen">{children}</div>
            {!hideNavs && <Footer />}
            <Toaster />
          </Theme>
        </div>
      </body>
    </html>
  );
}
