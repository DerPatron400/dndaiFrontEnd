import { cn } from "@/lib/utils";
import React from "react";
import Button from "../ui/custom-button";
import { User, CircleUserRound, Images } from "lucide-react";

export default function DrawerMenu({ isOpen, setIsOpen }) {
  return (
    <div
      className={cn(
        "absolute -top-5 left-[50%] ease-animate md:hidden bg-white/80 translate-x-[-150%] bg-blur h-screen w-screen flex flex-col justify-start ",
        isOpen && "translate-x-[-50%]"
      )}
    >
      <div className='w-[90%] mt-10 mx-auto rounded-lg text-white  flex justify-between items-center'>
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
              src='/Icons/Menu.svg'
              alt='logo'
              className='h-[15px] w-[15px] invert'
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
