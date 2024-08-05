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
    const setDocumentTitle = (url) => {
      let title = "DnDAI - Play AI-Guided Pen and Paper Games"; // Default title

      if (url.includes("character/sheet")) {
        title = "Character Overview - DnDAI";
      } else if (url === "/") {
        title = "Home - DnDAI";
      } else {
        const pageTitle = url.split("/").pop().replaceAll("-", " ");
        title = `${capitalizeFirstLetterOfEachWord(pageTitle)} - DnDAI`;
      }

      document.title = title;
      window.gtag("config", "G-BTHMYX7TZ9", {
        page_title: title,
        page_path: url,
        screen_name: title,
      });
    };

    setDocumentTitle(pathname);

    // Re-run on path changes
    const handleRouteChange = (url) => {
      setDocumentTitle(url);
    };

    if (window.gtag) {
      handleRouteChange(pathname); // Capture the initial page load
    }
  }, [pathname]);

  return (
    <html lang='en' suppressHydrationWarning className={inter.className}>
      <GoogleOAuthProvider clientId='1036030324483-ltg0nqpg0ectr5q3n7cfa66l7eq1ban8.apps.googleusercontent.com'>
        <head>
          {/* Google Analytics Script */}
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, maximum-scale=1'
          />
          <link rel='icon' href='/favicon.ico' />
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
          {/* Dynamic Meta Tags */}
          <meta
            name='description'
            content='Join DnDAI to play AI-supported pen and paper games. Explore adventure games, text-based games, and interactive fiction online for free.'
          />
          <meta
            name='keywords'
            content='AI adventure games, text-based games, interactive fiction, role-playing games, free online adventure games'
          />
          <meta
            property='og:title'
            content='Play AI-Guided Pen and Paper Games | DnDAI'
          />
          <meta
            property='og:description'
            content='Join DnDAI to play AI-supported pen and paper games. Explore adventure games, text-based games, and interactive fiction online for free.'
          />
          <meta property='og:url' content='https://www.dndai.app' />
          <meta property='og:type' content='website' />
        </head>
        <body
          className={`w-screen hide-scrollbar relative max-w-screen overflow-x-hidden bg-russianViolet`}
        >
          <Navbar
            characterSheet={characterSheet}
            variant={isTransparentNavbar ? "transparent" : "glass"}
          />
          <main className='z-[1]'>{children}</main>

          {showFooter && <Footer />}
          <Suspense fallback={null}>
            <CreditsDialogue />
          </Suspense>
          <div className='!z-[50]'>
            <Toaster />
          </div>
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}