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
export default function GameplayNavbar({ variant }) {
  const { showMenu, setShowMenu } = useControlsStore();
  const { isMobile } = useDeviceDetect();

  const { user } = useUserStore();

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
            <CustomIconbutton>
              <MoreOptions className='w-5 h-5  prevent-redirect' fill='white' />
            </CustomIconbutton>
            <SoundButton />
          </div>
        </div>
      </div>
    </div>
  );
}
