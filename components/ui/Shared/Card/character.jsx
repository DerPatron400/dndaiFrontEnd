"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Play from "@/components/ui/Icons/Play";
import CustomButton from "@/components/ui/custom-button";
import MoreOptions from "@/components/ui/Icons/MoreOptions";
import CustomMenuItem from "@/components/ui/custom-menu-item";
import Download from "@/components/ui/Icons/Download";
import { useRouter } from "next/navigation";
import Eye from "@/components/ui/Icons/Eye";
import { extractSection } from "@/lib/Helpers/shared";
import useGameStore from "@/utils/gameStore";
//resolved conflicts
export default function card({ character, carousel, className }) {
  const router = useRouter();
  const { setCurrentCharacter } = useGameStore();
  const [level, setLevel] = useState();

  const handlePlay = () => {
    setCurrentCharacter(character);
    router.push("/game/campaign-selection");
  };
  useEffect(() => {
    if (!character) return;
    let _level = extractSection(character.value, "level")?.trim();

    setLevel(_level);
  }, [character]);

  const handleRedirect = (event, path) => {
    const classNames =
      event?.target?.className?.baseVal || event?.target?.className;

    if (!classNames?.includes("prevent-redirect")) {
      router.push(path);
    }
  };
  return (
    <div
      onClick={(event) =>
        handleRedirect(event, `/character/sheet/${character._id}`)
      }
      className={cn(
        "rounded-[16px]  h-auto group hover:!shadow-custom-1 bg-white/[8%] group-hover:bg-white/10  my-0 cursor-pointer  overflow-hidden col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 w-full  border-white/[8%] border hover:border-white/20 running-text-mono ease-animate z-[10] ",
        className
      )}
    >
      <div className='w-full h-full overflow-hidden  border-none transition-all '>
        <div className='relative '>
          <img
            src={
              character?.personal?.portraitUrl ||
              "/images/CreateCharacter/CharacterName/CharacterName.png"
            }
            alt=''
            className='h-[248px] 2xl:h-full w-full  object-cover'
          />
          <div
            className={cn(
              "absolute text-xs text-white  top-0 right-0 p-4   justify-between items-end flex opacity-100 pointer-events-auto md:opacity-0 md:pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto  ease-animate "
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger className=' bg-blur  prevent-redirect  !h-7 !w-7 cursor-pointer !border ease-animate  border-white/10 hover:border-white/20 hover:bg-white/10 active:bg-white/20  active:border-white/40 disabled:opacity-30% disabled:pointer-events-none hover:!duration-200 !rounded-full active:!duration-100 !flex !items-center !justify-center'>
                <MoreOptions
                  className='w-4 h-4  prevent-redirect'
                  fill='white'
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-transparent uppercase flex flex-col mt-4 p-2 !px-[9px]  border border-white/10 z-[10] bg-blur menu-shadow text-white running-text-mono rounded-[16px] !gap-y-2'>
                <DropdownMenuItem className='flex !p-0  !my-0 w-full focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
                  <CustomMenuItem>
                    <Download className='h-5 w-5' fill='white' />
                    <span>Download Character Sheet</span>
                  </CustomMenuItem>
                </DropdownMenuItem>
                <DropdownMenuItem className='flex !p-0  !my-0 w-full focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
                  <CustomMenuItem onClick={handlePlay}>
                    <Play className='h-5 w-5' fill='white' />
                    <span>Play With Character</span>
                  </CustomMenuItem>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='  flex flex-col p-5  !gap-4'>
          <div className=' flex justify-between items-center'>
            <span className=' headline-4 text-white '>
              {character?.personal.name}
            </span>
            <img
              src={`https://dndai-images.s3.eu-central-1.amazonaws.com/class/${character?.personal?.class
                .toLowerCase()
                .replaceAll(" ", "-")}.webp`}
              className='rounded-full h-[32px] w-[32px]'
            />
          </div>
          <div className='flex flex-col running-text-mono'>
            <span className='text-white '>LEVEL {level || 0}</span>
            <span className='uppercase text-irisPurpleLight'>
              {character?.personal.race}{" "}
              <span className='uppercase text-sandyOrange'>
                {" "}
                {character?.personal.class}
              </span>
            </span>
          </div>
          <div
            className={cn(
              "flex justify-between items-center gap-5 text-white",
              carousel && "hidden"
            )}
          >
            <CustomButton withIcon>
              <Eye className='w-4 h-4' fill='white' />
              <span>SHOW DETAILS</span>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
