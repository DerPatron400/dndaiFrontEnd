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
import { extractSection } from "@/lib/Helpers/createCharacter";
export default function characterSheet({ character }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [appearance, setAppearance] = useState(false);

  useEffect(() => {
    let _appearance = extractSection(character.value, "appearance")?.trim();
    setAppearance(_appearance);
  }, [character]);
  return (
    <div className='h-full min-h-screen w-screen pt-32 px-5 pb-8 md:pt-[120px] md:pb-[104px] md:px-12 flex flex-col gap-[24px]'>
      <div className='hidden md:flex justify-start gap-[32px]'>
        <CustomButton variant={"primary"}>
          <Play className='h-4 w-4 opacity-70' />
          Play with characters
        </CustomButton>
        <CustomButton
          onClick={() => {
            setOpen(true);
            router.push(pathname);
          }}
          className={
            "border border-none bg-transparent p-0 hover:bg-transparent active:bg-transparent active:text-gray2"
          }
        >
          <Edit fill='white' className='h-4 w-4 opacity-70' />
          Change character portrait
        </CustomButton>
        <CustomButton
          className={
            "border border-none bg-transparent p-0 hover:bg-transparent active:bg-transparent active:text-gray2"
          }
        >
          <Download fill='white' className='h-4 w-4 opacity-70 text-white' />
          Download character sheet
        </CustomButton>
      </div>
      <div className=' h-full grid grid-cols-8 gap-5 '>
        <div className='col-span-8 md:col-span-2 relative'>
          <CharacterInfo character={character} />
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
        character={character}
        avatars={character?.personal?.portraits || []}
      />
    </div>
  );
}
