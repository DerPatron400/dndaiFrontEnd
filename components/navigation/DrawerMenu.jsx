import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import Button from "../ui/custom-button";
import { User, CircleUserRound, Images } from "lucide-react";

export default function DrawerMenu({ isOpen, setIsOpen }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);
  return (
    <div
      className={cn(
        "absolute !z-[100] -top-8 left-[50%] ease-animate opacity-0 pointer-events-none md:hidden bg-white/80 translate-x-[-150%] bg-blur h-screen w-screen flex flex-col justify-start ",
        isOpen && "translate-x-[-50%] opacity-100 pointer-events-auto"
      )}
    >
      <div className='w-[90%] mt-10 mx-auto rounded-lg text-white  flex justify-between items-center z-[100]'>
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
        <img
          src='/Icons/Cancel.svg'
          alt='logo'
          className='h-10 object-contain invert'
          onClick={() => setIsOpen(false)}
        />
      </div>

      <div className='mx-6 mt-10 gap-6 flex flex-col running-text-mono uppercase '>
        <div className='flex items-center gap-6 '>
          <Button withIcon>
            <img
              src='/Icons/Login.svg'
              alt='logo'
              className='h-[15px] w-[15px] '
            />
            SIGN IN
          </Button>
          <span className='running-text-mono uppercase'>Sign Up</span>
        </div>

        <div className='flex gap-3  hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 transition-all duration-300 ease-linear cursor-pointer'>
          <CircleUserRound size={15} className='text-iconColor' />
          <span>My characters</span>
        </div>
        <div className='flex gap-3 hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 transition-all duration-300 ease-linear cursor-pointer'>
          <Images size={15} className='text-iconColor' />
          <span>Saved images</span>
        </div>
        <div className='flex gap-3 hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 transition-all duration-300 ease-linear cursor-pointer'>
          <img src='/images/campaign.png' alt='' className='h-3 w-4' />
          <span>My campaigns</span>
        </div>
        <hr className='border-white/10 ' />

        <div className='flex gap-3  hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 transition-all duration-300 ease-linear cursor-pointer'>
          <span>How to play</span>
        </div>
        <div className='flex gap-3 hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 transition-all duration-300 ease-linear cursor-pointer'>
          <span>Gallery</span>
        </div>
        <div className='flex gap-3 hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 transition-all duration-300 ease-linear cursor-pointer'>
          <span>Store</span>
        </div>
        <Button className='mt-3 w-40' variant='primary'>
          PLAY FOR FREE
        </Button>
      </div>
    </div>
  );
}
