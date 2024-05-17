"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isTransparentNavbar = pathname.includes("/auth");
  const showFooter =
    !pathname.includes("/auth") && !pathname.includes("/character");
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <GoogleOAuthProvider clientId='1036030324483-ltg0nqpg0ectr5q3n7cfa66l7eq1ban8.apps.googleusercontent.com'>
        <body className={"w-screen  relative max-w-screen overflow-x-hidden "}>
          <Navbar variant={isTransparentNavbar ? "transparent" : "glass"} />
          {children}
          {showFooter && <Footer />}
          <Toaster />
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
