"use client";
import { Inter } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={"w-screen  relative max-w-screen overflow-x-hidden "}>
        <Navbar variant='glass' />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
