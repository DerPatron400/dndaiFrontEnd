import React, { useEffect, useState } from "react";
import CharacterInfo from "@/components/character/myCharacter/character-sheet/characterInfo";
import AbilitiesInfo from "@/components/character/myCharacter/character-sheet/abilitiesInfo";
import GeneralInfo from "@/components/character/myCharacter/character-sheet/general";
import CustomButton from "@/components/ui/custom-button";
import Play from "@/components/ui/Icons/Play";
import Edit from "@/components/ui/Icons/Edit";
import Download from "@/components/ui/Icons/Download";
import Avatar from "./create-avatar/avatar";
import { usePathname, useRouter } from "next/navigation";
import { extractSection } from "@/lib/Helpers/shared";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import SoundButton from "@/components/ui/Shared/SoundButton";
import Generate from "@/components/ui/Icons/Generate";
export default function characterSheet({ character, setCharacter }) {
  const [open, setOpen] = useState(false);
  const [currentPortrait, setCurrentPortrait] = useState(
    character.personal.portraitUrl
  );
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [appearance, setAppearance] = useState(false);

  useEffect(() => {
    let _appearance = extractSection(character.value, "appearance")?.trim();
    setAppearance(_appearance);
  }, [character]);
  return (
    <div className='h-full min-h-screen w-screen pt-32 px-5 pb-64 md:pt-[120px] md:pb-[104px] md:px-12 flex flex-col gap-[24px]'>
      <div className='hidden md:flex justify-start gap-[32px]'>
        <CustomButton variant={"primary"}>
          <Play className='h-4 w-4 opacity-70' />
          Play with characters
        </CustomButton>
        <CustomButton
          onClick={() => {
            setOpen(true);
            if (character?.personal?.portraits?.length > 0) {
              router.push(pathname);
            } else {
              router.push(pathname + "?generateAvatar=true");
            }
          }}
          variant='subtle'
        >
          {character?.personal?.portraits?.length > 0 ? (
            <Edit fill='white' className='h-4 w-4 opacity-70' />
          ) : (
            <Generate className='h-4 w-4 opacity-70 fill-white' />
          )}
          {character?.personal?.portraits?.length > 0 ? "Change " : "Create "}
          character portrait
        </CustomButton>
        <CustomButton variant='subtle'>
          <Download fill='white' className='h-4 w-4 opacity-70 text-white' />
          Download character sheet
        </CustomButton>
      </div>
      <div className=' h-full grid grid-cols-8 gap-5 '>
        <div className='col-span-8 md:col-span-2 relative'>
          <CharacterInfo
            loadingAvatar={loadingAvatar}
            currentPortrait={currentPortrait}
            character={character}
          />
        </div>
        <div className=' col-span-8 md:col-span-4 w-auto gap-[24px] flex flex-col'>
          <GeneralInfo character={character} />
        </div>
        <div className=' col-span-8 md:col-span-2  flex flex-col gap-[24px]'>
          <AbilitiesInfo character={character} />
        </div>
      </div>
      <Avatar
        open={open}
        setOpen={setOpen}
        payload={{
          appearance,
          id: character?._id,
        }}
        setCurrentPortrait={setCurrentPortrait}
        setLoadingAvatar={setLoadingAvatar}
        character={character}
        setCharacter={setCharacter}
        avatars={character?.personal?.portraits || []}
      />
      <div className='md:hidden z-[10] flex items-center justify-between bg-blur-bottom-menu fixed bottom-0 w-screen left-0 p-5 '>
        <div className='flex items-center gap-4'>
          <SoundButton />
          <CustomIconbutton
            onClick={() => {
              setOpen(true);
              router.push(pathname);
            }}
          >
            <Edit fill='white' className='h-4 w-4 opacity-70' />
          </CustomIconbutton>
        </div>
        <CustomButton variant={"primary"}>
          <Play className='h-4 w-4 opacity-70' />
          Play Now
        </CustomButton>
      </div>
    </div>
  );
}
