"use client";

import Link from "next/link";
import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <div>
      <footer className="text-white py-10 bg-gradient-to-t to-black from-[#1f1f1f]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* First Column: Logo */}
            <div className="flex items-center justify-center md:col-span-1 lg:col-span-1 gap-x-2">
              <Copyright />
              <span>dndai.app</span>
              <img src="/Logo/white.png" alt="Logo" className="h-12 w-12" />
            </div>
            {/* Second Column: Shop */}

            <div className="col-span-1 flex md:block flex-col items-center justify-center">
              <h3 className="text-md mb-2 font-medium text-green-500">
                NAVIGATION
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/shop"
                    passHref
                    className="text-white transition duration-300 hover:text-white focus:text-white hover:bg-transparent"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    passHref
                    className="text-white transition duration-300 hover:text-white focus:text-white hover:bg-transparent"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <a
                    href="https://discord.gg/xyfdCn2PnW"
                    target="_blank"
                    className="text-white transition duration-300 hover:text-white focus:text-white hover:bg-transparent"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/dndai_app"
                    target="_blank"
                    className="text-white transition duration-300 hover:text-white focus:text-white hover:bg-transparent"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://patreon.com/user?u=105890862&utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=creatorshare_creator&utm_content=join_link"
                    target="_blank"
                    className="text-white transition duration-300 hover:text-white focus:text-white hover:bg-transparent"
                  >
                    Patreon
                  </a>
                </li>
              </ul>
            </div>

            {/* Fourth Column: External Links */}
            <div className="col-span-1 flex md:block flex-col items-center justify-center">
              <h3 className="text-md mb-2 font-medium text-green-500">
                HELP AND SUPPORT
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/instructions"
                    passHref
                    className="text-white hover:text-gray-300"
                  >
                    Help / Instructions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    passHref
                    className="text-white hover:text-gray-300"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    passHref
                    className="text-white hover:text-gray-300"
                  >
                    Privacy
                  </Link>
                </li>

                <li>
                  <Link
                    href="/imprint"
                    passHref
                    className="text-white hover:text-gray-300"
                  >
                    Imprint
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    passHref
                    className="text-white hover:text-gray-300"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
            {/* Third Column: Social Media */}
            <div className="col-span-1 flex md:block flex-col items-center justify-center">
              <h3 className="text-md mb-2 font-medium text-green-500">
                CATEGORIES
              </h3>
              <ul className="space-y-2">
                <li>English</li>
                {/* <li>Spanish</li>
                <li>French</li>
                <li>German</li>
                <li>Italian</li> */}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
