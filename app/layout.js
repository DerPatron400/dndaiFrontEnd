"use client";
import React, { useEffect, Suspense } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import GameplayNavbar from "@/components/navigation/GameplayNavbar";
import Footer from "@/components/navigation/Footer";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from "next/script";
import "./globals.css";
import useGameStore from "@/utils/gameStore";
import CreditsDialogue from "@/components/ui/Shared/Dialogue/GetCredits";
import { capitalizeFirstLetterOfEachWord } from "@/lib/Helpers/shared";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const { reset, currentCharacter, currentCampaign, game } = useGameStore();
  const isTransparentNavbar =
    pathname.includes("/auth") || pathname.includes("/game/play");
  const showFooter =
    !pathname.includes("/auth") &&
    !pathname.includes("/character") &&
    !pathname.includes("/campaign") &&
    !pathname.includes("/discover") &&
    !pathname.includes("game") &&
    !pathname.includes("payment");

  const characterSheet = pathname.includes("/character/sheet");

  useEffect(() => {
    const initializeGtag = () => {
      if (!window.gtag) return;

      let title = pathname.split("/").pop().replaceAll("-", " ");

      if (pathname.includes("character/sheet")) {
        title = "Character Overview";
      } else if (pathname === "/") {
        title = "Home";
      }
      const formattedPath =
        pathname === "/" ? "home" : pathname.slice(1).replace("/", " / ");
      document.title = title; // Set document.title to the URL
      gtag("config", "G-BTHMYX7TZ9", {
        page_title: document.title,
        page_path: window.location.pathname,
        screen_name: title, // Custom screen name
      });
    };

    const handleRouteChange = (url) => {
      let title = url.split("/").pop().replaceAll("-", " ");

      if (url.includes("character/sheet")) {
        title = "Character Overview";
      } else if (url === "/") {
        title = "Home";
      }

      const formattedPath =
        url === "/" ? "home" : url.slice(1).replace("/", " / ");
      document.title = capitalizeFirstLetterOfEachWord(title); // Set document.title to the URL
      window.gtag("config", "G-BTHMYX7TZ9", {
        page_title: document.title,
        page_path: url,
        screen_name: title, // Custom screen name
      });
    };

    if (window.gtag) {
      initializeGtag(); // Capture the initial page load
    }

    // Re-run on path changes
    handleRouteChange(pathname);
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning className={""}>
      <GoogleOAuthProvider clientId="1036030324483-ltg0nqpg0ectr5q3n7cfa66l7eq1ban8.apps.googleusercontent.com">
        <head>
          {/* Google Analytics Script */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
          <link rel="icon" href="/favicon.ico" />
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
        <body
          className={`w-screen hide-scrollbar relative max-w-screen overflow-x-hidden bg-russianViolet `}
        >
          {!pathname.includes("components") && (
            <div>
              <img
                src="/images/bg.png"
                alt="Background"
                className="h-screen w-screen object-fill fixed top-0 left-0 z-0"
              />
            </div>
          )}

          <Navbar
            characterSheet={characterSheet}
            variant={isTransparentNavbar ? "transparent" : "glass"}
          />
          <div className="z-[1]">{children}</div>

          {showFooter && <Footer />}
          <Suspense fallback={null}>
            <CreditsDialogue />
          </Suspense>
          <div className="!z-[50]">
            <Toaster />
          </div>
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
