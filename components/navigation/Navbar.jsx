"use client";
import React from "react";
import AccountDropdown from "@/components/account/accountDropdown";
import useDeviceDetect from "@/hooks/useDviceDetect";
import { cn } from "@/lib/utils";
import CustomButton from "../ui/custom-button";

export default function Navbar({ variant }) {
  const { isMobile } = useDeviceDetect();
  return (
    <div
      className={cn(
        " running-text-mono w-[95%] absolute rounded-2xl border border-white/10 top-5 left-[50%] translate-x-[-50%] flex bg-white/10 h-[64px]  justify-center p-3 ps-4  z-10",
        variant === "glass" && "bg-blur"
      )}
    >
      {isMobile ? (
        <div className='w-full h-full rounded-lg text-white  flex justify-between items-center'>
          <a
            href='#'
            className='text-white hover:text-gray2 transition-all duration-300 ease-in-out'
          >
            <img
              src='/images/logo.png'
              alt='logo'
              className='h-10 object-contain'
            />
          </a>
        </div>
      ) : (
        <div className=' w-full h-full text-white  flex justify-between items-center'>
          <div className='flex justify-center items-center gap-6'>
            <a
              href='#'
              className='text-white me-2 hover:text-gray2 transition-all duration-300 ease-in-out'
            >
              <img src='/images/logo.png' alt='logo' className='h-10' />
            </a>

            <a
              href='#'
              className='text-white hover:text-gray2 transition-all duration-300 ease-in-out '
            >
              HOW TO PLAY
            </a>

            <a
              href='#'
              className='text-white hover:text-gray2 transition-all duration-300 ease-in-out'
            >
              GALLERY
            </a>
            <a
              href='#'
              className='text-white hover:text-gray2 transition-all duration-300 ease-in-out'
            >
              STORE
            </a>
          </div>
          <div className='flex justify-center items-center gap-5'>
            <span className='running-text-mono uppercase'>Sign Up</span>
            <AccountDropdown />
            <button className='bg-white py-3 px-4 text-black rounded-xl'>
              PLAY FOR FREE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
