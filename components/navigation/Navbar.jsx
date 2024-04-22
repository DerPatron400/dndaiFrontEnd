import React from "react";
import AccountDropdown from "@/components/account/accountDropdown";

export default function Navbar() {
  return (
    <div className="w-full absolute top-0 flex justify-center py-5 dm-mono z-10">
      <div className="w-[95%] rounded-lg text-white p-3 bg-blur flex justify-between items-center">
        <div className="flex justify-center items-center gap-5">
          <a href="#" className="text-white hover:text-gray-300">
            <img src="/images/logo.png" alt="logo" className="h-10" />
          </a>
          <a href="#" className="text-white hover:text-gray-300 ">
            HOW TO PLAY
          </a>

          <a href="#" className="text-white hover:text-gray-300">
            GALLERY
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            STORE
          </a>
        </div>
        <div className="flex justify-center items-center gap-5">
          <button className="bg-none text-white ">SIGN UP</button>
          <AccountDropdown />
          <button className="bg-white py-3 px-4 text-black rounded-xl">
            PLAY FOR FREE
          </button>
        </div>
      </div>
    </div>
  );
}
