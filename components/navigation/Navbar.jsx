"use client";
import React, { useEffect, useRef, useState } from "react";
import AccountDropdown from "@/components/account/accountDropdown";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { cn } from "@/lib/utils";
import CustomButton from "../ui/custom-button";
import DrawerMenu from "./DrawerMenu";
import Link from "next/link";
import CustomIconbutton from "../ui/custom-iconbutton";
import { Volume2 } from "lucide-react";
import { usePathname } from "next/navigation";
import useControlsStore from "@/utils/controlsStore";
import useUserStore from "@/utils/userStore";
import Menu from "@/components/ui/Icons/Menu";
import Play from "@/components/ui/Icons/Play";
import { getCharacter } from "@/actions/character";
import useGameStore from "@/utils/gameStore";
import { useRouter } from "next/navigation";
export default function Navbar({ variant, characterSheet }) {
  const { showMenu, setShowMenu } = useControlsStore();
  const { isMobile } = useDeviceDetect();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isSignUp = pathname.includes("/auth/sign-up");
  const { user } = useUserStore();
  const { setCurrentCharacter } = useGameStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const mobileBlurNotAllowed =
    pathname === "/" ||
    pathname.includes("/my-campaigns") ||
    pathname.includes("/create");

  // const scrollFromTop = useRef(0);

  // useEffect(() => {
  //   //get scrollFromTop
  //   const handleScroll = () => {
  //     scrollFromTop.current = window.scrollY;
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const handlePlayWithCharacter = async () => {
    try {
      setIsLoading(true);
      const characterId = pathname.split("/").pop();

      const { character } = await getCharacter(characterId, user?.token);

      setCurrentCharacter(character);
      router.push("/game/campaign-selection");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className={cn(
        "px-5 md:px-8 fixed top-0 pt-16 pb-4 md:py-0 flex flex-col md:top-8 z-20 w-full",
        isMobile && !mobileBlurNotAllowed && "bg-blur-bottom-menu "
      )}
    >
      <div
        className={cn(
          " running-text-mono w-full rounded-2xl md:border border-white/10 top-0 md:top-8 left-0 translate-x-[0] flex h-auto md:h-[64px]  justify-center md:p-[8px] md:ps-4 ",
          variant === "glass" && "md:bg-blur",
          isMobile && "bg-transparent border-0",
          variant === "transparent" && "bg-transparent border-0"
          //scrollFromTop.current > 100 && "bg-white/10 border-white/10 bg-blur"
        )}
      >
        {/* Mobile */}
        <div
          className={
            "w-full h-full rounded-lg text-white  md:hidden flex justify-between items-center"
          }
        >
          <Link
            href='#'
            className='text-white hover:text-gray1 transition-all duration-300 ease-in-out'
          >
            <img
              src='/Icons/Logo.svg'
              alt='logo'
              className='h-8 object-contain'
            />
          </Link>
          <Menu
            onClick={() => setShowMenu(true)}
            className='w-10 '
            fill='#9A9AC1'
          />

          <DrawerMenu />
        </div>
        {/* Desktop */}
        <div className=' w-full hidden h-full text-white  md:flex justify-between items-center'>
          <div className='flex justify-center items-center gap-6'>
            <Link
              href='/'
              className='text-white me-2 hover:text-gray1 transition-all duration-300 ease-in-out'
            >
              <img src='/Icons/Logo.svg' alt='logo' className='h-10' />
            </Link>

            <Link
              href='#'
              className='text-white hover:text-gray1 transition-all duration-300 ease-in-out '
            >
              HOW TO PLAY
            </Link>

            <Link
              href='#'
              className='text-white hover:text-gray1 transition-all duration-300 ease-in-out'
            >
              GALLERY
            </Link>
            <Link
              href='#'
              className='text-white hover:text-gray1 transition-all duration-300 ease-in-out'
            >
              STORE
            </Link>
          </div>
          <div className='flex justify-center items-center gap-5'>
            <span
              className={cn(
                "running-text-mono uppercase cursor-pointer",
                user && "hidden"
              )}
            >
              {isSignUp ? (
                <Link href={"/auth/sign-in"}>Sign In</Link>
              ) : (
                <Link href={"/auth/sign-up"}>Sign Up</Link>
              )}
            </span>
            <AccountDropdown />
            {variant === "transparent" ? (
              <CustomIconbutton>
                <Volume2 className='h-5 w-5' />
              </CustomIconbutton>
            ) : characterSheet ? (
              <CustomButton
                variant={"primary"}
                disabled={isLoading}
                withIcon={true}
                onClick={handlePlayWithCharacter}
              >
                <Play className='h-5 w-5 fill-russianViolet opacity-70' />
                PLAY Now
              </CustomButton>
            ) : (
              <CustomButton variant={"primary"}>PLAY FOR FREE</CustomButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
