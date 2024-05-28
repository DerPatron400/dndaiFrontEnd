"use client";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from 'next/script';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isTransparentNavbar = pathname.includes("/auth");
  const showFooter =
    !pathname.includes("/auth") && !pathname.includes("/character");

  useEffect(() => {
    const initializeGtag = () => {
      if (!window.gtag) return;
      gtag('config', 'G-BTHMYX7TZ9', {
        page_title: document.title,
        page_path: window.location.pathname,
        screen_name: pathname.split('/')[1] || 'home', // Custom screen name
      });
    };

    const handleRouteChange = (url) => {
      window.gtag('config', 'G-BTHMYX7TZ9', {
        page_title: document.title,
        page_path: url,
        screen_name: url.split('/')[1] || 'home', // Custom screen name
      });
    };

    if (window.gtag) {
      initializeGtag(); // Capture the initial page load
    }

    // Re-run on path changes
    handleRouteChange(pathname);

  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <GoogleOAuthProvider clientId="1036030324483-ltg0nqpg0ectr5q3n7cfa66l7eq1ban8.apps.googleusercontent.com">
        <head>
          {/* Google Analytics Script */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-BTHMYX7TZ9`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-BTHMYX7TZ9', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </head>
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