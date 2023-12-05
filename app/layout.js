"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  //i wanna get paths that include /login and /register and then hide navbar and footer on those pages
  const path = usePathname();

  const hideNavbar = path.includes("/login") || path.includes("/register");
  const hideFooter = path.includes("/login") || path.includes("/register");

  return (
    <html lang='en'>
      <body className={inter.className + " bg-black overflow-x-hidden"}>
        <div className='max-w-screen !overflow-hidden '>
          {!hideNavbar && <Navbar />}
          <div className='min-h-screen'>{children}</div>
          {!hideFooter && <Footer />}
        </div>
      </body>
    </html>
  );
}
