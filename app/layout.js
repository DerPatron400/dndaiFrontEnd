"use client";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import GameplayNavbar from "@/components/navigation/GameplayNavbar";
import Footer from "@/components/navigation/Footer";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isTransparentNavbar =
    pathname.includes("/auth") || pathname.includes("/game/play");
  const showFooter =
    !pathname.includes("/auth") &&
    !pathname.includes("/character") &&
    !pathname.includes("/campaign") &&
    !pathname.includes("/discover") &&
    !pathname.includes("game");

  const characterSheet = pathname.includes("/character/sheet");

  useEffect(() => {
    const initializeGtag = () => {
      if (!window.gtag) return;
      gtag("config", "G-BTHMYX7TZ9", {
        page_title: document.title,
        page_path: window.location.pathname,
        screen_name: pathname.split("/")[1] || "home", // Custom screen name
      });
    };

    const handleRouteChange = (url) => {
      window.gtag("config", "G-BTHMYX7TZ9", {
        page_title: document.title,
        page_path: url,
        screen_name: url.split("/")[1] || "home", // Custom screen name
      });
    };

    if (window.gtag) {
      initializeGtag(); // Capture the initial page load
    }

    // Re-run on path changes
    handleRouteChange(pathname);
  }, [pathname]);

  return (
    <html lang='en' suppressHydrationWarning={true} className={inter.className}>
      <GoogleOAuthProvider clientId='1036030324483-ltg0nqpg0ectr5q3n7cfa66l7eq1ban8.apps.googleusercontent.com'>
        <head>
          {/* Google Analytics Script */}
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
          <Script
            strategy='afterInteractive'
            src={`https://www.googletagmanager.com/gtag/js?id=G-BTHMYX7TZ9`}
          />
          <Script
            id='google-analytics'
            strategy='afterInteractive'
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
        <body
          className={`w-screen hide-scrollbar relative max-w-screen overflow-x-hidden ${inter.className}`}
        >
          {!pathname.includes("components") && (
            <div>
              <img
                src='/images/bg.png'
                alt='Background'
                className='h-screen w-screen object-fill fixed top-0 left-0 z-0'
              />
            </div>
          )}
          <div className='z-[1]'>{children}</div>

          <Navbar
            characterSheet={characterSheet}
            variant={isTransparentNavbar ? "transparent" : "glass"}
          />

          {showFooter && <Footer />}
          <div className='!z-[50]'>
            <Toaster />
          </div>
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
