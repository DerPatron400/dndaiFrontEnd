"use client";
import React, { useEffect, useRef, useState } from "react";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { cn } from "@/lib/utils";
import CustomIcontext from "@/components/ui/custom-icontext";

import Link from "next/link";
import useControlsStore from "@/utils/controlsStore";
import useUserStore from "@/utils/userStore";

import MoreOptions from "@/components/ui/Icons/MoreOptions";
import SoundButton from "@/components/ui/Shared/SoundButton";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import CustomMenuItem from "@/components/ui/custom-menu-item";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Save from "@/components/ui/Icons/Save";
import Exit from "@/components/ui/Icons/Exit";
import CustomButton from "../ui/custom-button";
import Diamond from "../ui/Icons/Diamond";
import useGameStore from "@/utils/gameStore";
import { saveCharacter } from "@/actions/game";
import { useRouter } from "next/navigation";
import useCustomToast from "@/hooks/useCustomToast";
export default function GameplayNavbar({ loading, setLoading }) {
  const { showMenu, setShowMenu } = useControlsStore();
  const { invokeToast } = useCustomToast();
  const { isMobile } = useDeviceDetect();
  const { user, setYellowCredits, setBlueCredits } = useUserStore();
  const router = useRouter();

  const { setCurrentCharacter, game, currentCharacter } = useGameStore();

  const handleSaveCharacter = async () => {
    try {
      setLoading(true);
      console.log(game);
      const payload = {
        characterId: game.characterId,
        gameId: game._id,
      };

      const { character, credits } = await saveCharacter(payload, user?.token);
      setCurrentCharacter(character);

      setYellowCredits(credits.yellow);
      setBlueCredits(credits.blue);
      invokeToast("Character Saved Successfully", "Success");
    } catch (error) {
      invokeToast(
        error?.response?.data?.message || "Something Went Wrong",
        "error"
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='px-5 md:px-8 fixed top-5 md:top-8 z-20 w-full'>
      <div
        className={cn(
          " running-text-mono w-full rounded-2xl bg-transparent border-0 top-0 md:top-8 left-0 translate-x-[0] flex h-auto md:h-[64px]  justify-center md:p-[8px] md:ps-4 "
        )}
      >
        <div
          className={
            "w-full h-full rounded-lg text-white  flex justify-between items-center"
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
          <div className='flex gap-5 items-center'>
            <CustomIcontext>
              <img
                src='/gems/Mythic.webp'
                alt=''
                className='h-[18px] object-contain '
              />
              {user.blueCredits}
            </CustomIcontext>
            <CustomIcontext>
              <img
                src='/gems/Legendary.webp'
                alt=''
                className='h-[18px] object-contain '
              />
              {user.yellowCredits}
            </CustomIcontext>
            <DropdownMenu>
              <DropdownMenuTrigger className=' bg-blur  prevent-redirect  !h-9 !w-9 cursor-pointer !border ease-animate  border-white/10 hover:border-white/20 hover:bg-white/10 active:bg-white/20  active:border-white/40 disabled:opacity-30% disabled:pointer-events-none hover:!duration-200 !rounded-full active:!duration-100 !flex !items-center !justify-center'>
                <MoreOptions
                  className='w-5 h-5  prevent-redirect'
                  fill='white'
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-transparent uppercase flex flex-col mt-4 p-2 !px-[9px]  border border-white/10 z-[10] bg-blur menu-shadow text-white running-text-mono rounded-[16px] !gap-y-2'>
                <DropdownMenuItem className='flex !p-0  !my-0 w-full focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
                  <CustomButton
                    withIcon={true}
                    variant={"upgrade"}
                    className={"w-full"}
                  >
                    <Diamond className='h-5 w-5' fill='white' />
                    Upgrade
                  </CustomButton>
                </DropdownMenuItem>
                <DropdownMenuItem className='flex !p-0  !my-0 w-full focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
                  <CustomMenuItem onClick={handleSaveCharacter}>
                    <Save className='h-5 w-5' fill='white' />
                    <span>Save Character</span>
                  </CustomMenuItem>
                </DropdownMenuItem>
                <DropdownMenuItem className='flex !p-0  !my-0 w-full focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
                  <CustomMenuItem onClick={() => router.push("/")}>
                    <Exit className='h-5 w-5' fill='white' />
                    <span>Exit Game</span>
                  </CustomMenuItem>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <SoundButton />
          </div>
        </div>
      </div>
    </div>
  );
}
