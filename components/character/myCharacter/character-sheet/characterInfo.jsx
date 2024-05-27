import React from "react";
import IconButton from "@/components/ui/custom-iconbutton";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import Sheet from "@/components/ui/Icons/Sheet";
import dynamic from "next/dynamic";
import useUserStore from "@/utils/userStore";
import Info from "@/components/ui/Icons/Info";
import { cn } from "@/lib/utils";

const ProfileButtons = dynamic(() =>
  import("@/components/character/myCharacter/character-sheet/profile-buttons", {
    ssr: false,
  })
);

export default function characterInfo({ character }) {
  const { user } = useUserStore();
  return (
    <div className=" className='w-full h-auto border border-white/10 bg-white/10 rounded-[16px] flex flex-col justify-start">
      <div>
        <div className='h-[345px] w-full relative'>
          <img
            src='/images/CreateCharacter/CharacterName/CharacterName.png'
            alt=''
            className=' h-full w-full object-cover rounded-t-[10px] '
          />
          <div
            className={cn(
              "absolute bottom-0 left-0 w-full bg-sandyOrange gap-2 py-4 pe-6 ps-5 flex items-center justify-center text-black",
              user && "opacity-0 pointer-events-none"
            )}
          >
            <Info className='w-4 h-4' fill='#000' />{" "}
            <span className='description text-russianViolet uppercase'>
              Sign up to change character portrait
            </span>
          </div>
        </div>
        <div className='flex flex-col p-5 pt-6 gap-4'>
          <div className=' flex justify-between items-center'>
            <span className=' headline-4 text-white '>
              {character?.personal?.name}
            </span>
            <IconButton className='bg-white  font-roboto-mono hover:bg-white h-6 w-6'></IconButton>
          </div>
          <div className='flex flex-col running-text-mono'>
            <span className='text-white '>
              LEVEL {character?.personal?.level}
            </span>
            <span className=' text-irisPurpleLight'>
              {character?.personal?.race}{" "}
              <span className=' text-sandyOrange'>
                {character?.personal?.class}
              </span>
            </span>
          </div>
        </div>
      </div>
      <ProfileButtons details={character.value} />
    </div>
  );
}
