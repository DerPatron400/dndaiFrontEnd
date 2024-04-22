import React from "react";

export default function Footer() {
  return (
    <footer className="bg-russianViolet text-white px-2 py-20">
      <div className="container mx-auto">
        <div className="flex flex-wrap md:gap-10 gap-0 justify-between ">
          {/* Help and Support Section */}
          <div className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <h3 className="text-[14px] text-irisPurpleLight running-text-mono mb-4">
              HELP AND SUPPORT
            </h3>
            <ul>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <h3 className="mb-4 text-[14px] text-irisPurpleLight running-text-mono">
              LEGAL
            </h3>
            <ul>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <h3 className="text-[14px] text-irisPurpleLight running-text-mono mb-4">
              SOCIAL MEDIA
            </h3>
            <ul>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Copyright Notice */}
        <div className="text-center md:text-left mt-14 ">
          <p className="text-lg">DND AI © 2024 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
