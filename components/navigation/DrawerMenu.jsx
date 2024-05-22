import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import Button from "../ui/custom-button";
import { User, CircleUserRound, Images } from "lucide-react";
import useUserStore from "@/utils/userStore";
import Link from "next/link";
import useControlsStore from "@/utils/controlsStore";
export default function DrawerMenu() {
  const { user } = useUserStore();
  const { showMenu, setShowMenu } = useControlsStore();

  useEffect(() => {
    if (showMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showMenu]);

  return (
    <div
      className={cn(
        "absolute !z-[100] -top-8 left-[50%] ease-animate opacity-0 pointer-events-none md:hidden translate-x-[-150%]    h-screen w-screen flex flex-col justify-start ",
        showMenu &&
          "translate-x-[-50%] bg-blur-drawer opacity-100 pointer-events-auto  "
      )}
    >
      <div className='w-full px-[20px] mt-11 mx-auto rounded-lg text-white  flex justify-between items-center !z-[100]'>
        <Link
          href='/'
          className='text-white hover:text-gray2 transition-all duration-300 ease-in-out'
        >
          <img
            src='/Icons/Logo.svg'
            alt='logo'
            className='h-[32px] object-contain'
          />
        </Link>
        <img
          src='/Icons/Cancel.svg'
          alt='logo'
          className='h-10 object-contain '
          onClick={() => setShowMenu(false)}
        />
      </div>

      <div className='mx-[20px] mt-10 gap-[34px] flex flex-col running-text-mono uppercase '>
        <div className={cn("flex items-center gap-6 ", user && "hidden")}>
          <Button withIcon>
            <img
              src='/Icons/Login.svg'
              alt='logo'
              className='h-5 w-5 opacity-70 '
            />
            SIGN IN
          </Button>
          <span className='running-text-mono uppercase'>Sign Up</span>
        </div>

        <div className='flex gap-3  hover:bg-transparent focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
          <img
            src='/Icons/UserCircle.svg'
            alt=''
            className='h-5 w-5 opacity-70'
          />
          <span>My characters</span>
        </div>
        <div className='flex gap-3 hover:bg-transparent focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
          <img
            src='/Icons/ImageLibrary.svg'
            alt=''
            className='h-5 w-5  opacity-70'
          />
          <span>Saved images</span>
        </div>
        <div className='flex gap-3 hover:bg-transparent focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
          <img
            src='/Icons/Campaign.svg'
            alt=''
            className='h-5 w-5  opacity-70'
          />
          <span>My campaigns</span>
        </div>
        <hr className='border-white/10 ' />

        <div className='flex gap-3  hover:bg-transparent focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
          <span>How to play</span>
        </div>
        <div className='flex gap-3 hover:bg-transparent focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
          <span>Gallery</span>
        </div>
        <div className='flex gap-3 hover:bg-transparent focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
          <span>Store</span>
        </div>
        <Button className='mt-3 w-40' variant='primary'>
          PLAY FOR FREE
        </Button>
      </div>
    </div>
  );
}
