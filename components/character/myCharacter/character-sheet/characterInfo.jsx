import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useUserStore from "@/utils/userStore";
import Info from "@/components/ui/Icons/Info";
import { cn } from "@/lib/utils";
import Loader from "@/components/ui/Loader";
import { extractSection } from "@/lib/Helpers/shared";

const ProfileButtons = dynamic(() =>
  import("@/components/character/myCharacter/character-sheet/profile-buttons", {
    ssr: false,
  })
);

export default function characterInfo({
  character,
  currentPortrait,
  loadingAvatar,
}) {
  const { user } = useUserStore();
  const [level, setLevel] = useState();

  useEffect(() => {
    if (!character) return;
    let _level = extractSection(character.value, "level")?.trim();

    setLevel(_level);
  }, [character]);

  return (
    <div className=' w-full h-auto border border-white/10 bg-white/10 rounded-[16px] overflow-hidden flex flex-col justify-start'>
      <div>
        <div className='h-auto w-full relative'>
          {loadingAvatar && (
            <Loader
              text='Loading Avatar...'
              className='absolute top-0 left-0 w-full h-full bg-blur flex items-center justify-center'
            />
          )}
          <img
            src={
              currentPortrait ||
              "/images/CreateCharacter/CharacterName/CharacterName.png"
            }
            alt=''
            className=' w-full object-contain aspect-square rounded-t-[10px] '
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
            <img
              src={`https://dndai-images.s3.eu-central-1.amazonaws.com/class/${character?.personal?.class
                .toLowerCase()
                .replaceAll(" ", "-")}.webp`}
              className='rounded-full h-[32px] w-[32px]'
            />
          </div>
          <div className='flex flex-col running-text-mono'>
            <span className='text-white '>LEVEL {level}</span>
            <span className=' text-irisPurpleLight uppercase'>
              {character?.personal?.race}{" "}
              <span className=' text-sandyOrange uppercase'>
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
