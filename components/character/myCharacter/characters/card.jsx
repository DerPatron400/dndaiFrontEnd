"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IconButton from "@/components/ui/custom-iconbutton";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import Play from "@/components/ui/Icons/Play";
import CustomButton from "@/components/ui/custom-button";
import MoreOptions from "@/components/ui/Icons/MoreOptions";
import CustomMenuItem from "@/components/ui/custom-menu-item";
import Download from "@/components/ui/Icons/Download";
import { useRouter } from "next/navigation";

//resolved conflicts
export default function card({ character, carousel, className }) {
  const router = useRouter();

  const handleRedirect = (path) => {
    router.push(path);
  };
  return (
    <div
      className={cn(
        "rounded-[16px] h-auto group  my-0  overflow-hidden col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 w-full  border-white/[8%] border hover:border-white/20 running-text-mono ease-animate ",
        className
      )}
    >
      <div className='w-full h-full hover:!shadow-custom-1 overflow-hidden  border-none bg-russianViolet transition-all duration-200 ease-in-out '>
        <CardHeader className='relative '>
          <img
            src='/images/Header.png'
            alt=''
            className='h-[248px] w-full  object-cover'
          />
          <div
            className={cn(
              "absolute text-xs text-white  right-0 p-4   justify-between items-end flex opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto  ease-animate "
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger className=' !h-7 !w-7 cursor-pointer !border ease-animate  border-white/10 hover:border-white/20 hover:bg-white/10 active:bg-white/20  active:border-white/40 disabled:opacity-30% disabled:pointer-events-none hover:!duration-200 !rounded-full active:!duration-100 bg-blur !flex !items-center !justify-center'>
                <MoreOptions className='w-4 h-4' fill='white' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-transparent uppercase flex flex-col mt-4 p-2 !px-[9px]  border border-white/10 z-[10] bg-blur menu-shadow text-white running-text-mono rounded-[16px] !gap-y-2'>
                <DropdownMenuItem className='flex !p-0  !my-0 w-full focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
                  <CustomMenuItem>
                    <Download className='h-5 w-5' fill='white' />
                    <span>Download Character Sheet</span>
                  </CustomMenuItem>
                </DropdownMenuItem>
                <DropdownMenuItem className='flex !p-0  !my-0 w-full focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
                  <CustomMenuItem>
                    <Play className='h-5 w-5' fill='white' />
                    <span>Play With Character</span>
                  </CustomMenuItem>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className='  flex flex-col p-5 bg-white/[8%] group-hover:bg-white/10 gap-[20px]'>
          <div className=' flex justify-between items-center'>
            <span className=' headline-4 text-white '>
              {character.personal.name}
            </span>
            <IconButton className='bg-white  font-roboto-mono hover:bg-white h-6 w-6'></IconButton>
          </div>
          <div className='flex flex-col running-text-mono'>
            <span className='text-white '>
              LEVEL {character.personal.level}
            </span>
            <span className=' text-irisPurpleLight'>
              {character.personal.race}{" "}
              <span className=' text-sandyOrange'>
                {" "}
                {character.personal.class}
              </span>
            </span>
          </div>
          <div
            className={cn(
              "flex justify-between items-center gap-5 text-white",
              carousel && "hidden"
            )}
          >
            <CustomButton
              onClick={() =>
                handleRedirect(`/character/sheet/${character._id}`)
              }
              withIcon
            >
              <Play className='h-3.5 w-3.5' fill={"#fff"} />
              <span>SHOW DETAILS</span>
            </CustomButton>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
