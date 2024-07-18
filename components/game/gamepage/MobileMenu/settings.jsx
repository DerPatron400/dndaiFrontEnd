import React from "react";

import Settings from "@/components/ui/Icons/Settings";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import CustomButton from "@/components/ui/custom-button";
import Generate from "@/components/ui/Icons/Generate";
import Save from "@/components/ui/Icons/Save";
import AdjustTextSize from "../AdjustTextSize";
import Eye from "@/components/ui/Icons/Eye";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import SaveCharacterDialogue from "@/components/ui/Shared/Dialogue/SaveCharacter";
export default function SettingsMenu({
  textSize,
  setTextSize,
  showMenu,
  gameCharacter,
  setImageDialog,
  setNarrateDialog,
  handleSaveCharacter,
  setShowMenu,
}) {
  const router = useRouter();

  const handleRedirect = (path) => {
    window.open(path, "_blank");
  };

  const handleGenerateImage = () => {
    setImageDialog(true);
    setShowMenu(false);
  };
  const handleNarrate = () => {
    setNarrateDialog(true);
    setShowMenu(false);
  };
  return (
    <>
      <hr
        className={cn("w-9 border-[1px] rounded-sm border-gray1 text-gray1")}
      />
      <div className='w-full border settings-menu  rounded-[16px] bg-white/10 border-white/10 game-mobile-menu-shadow '>
        <div className='p-5 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <img
              src={
                gameCharacter?.personal?.portraitUrl ||
                "/images/CreateCharacter/CharacterName/CharacterName.png"
              }
              alt=''
              className='h-8 w-8 rounded-full'
            />
            <div className='running-text-mono uppercase'>
              <span>
                {gameCharacter?.value?.name}, Level{" "}
                {gameCharacter?.value?.level}{" "}
              </span>
              <div>
                <span className='uppercase text-irisPurpleLight'>
                  {gameCharacter?.personal.race}
                  <span className='uppercase text-sandyOrange'>
                    {" "}
                    {gameCharacter?.personal.class}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <CustomIconbutton
            onClick={() =>
              handleRedirect(`/character/sheet/${gameCharacter._id}`)
            }
          >
            <Eye className='h-5 w-5 fill-white ' />
          </CustomIconbutton>
        </div>
        <div className='gap-2 flex flex-col items-start justify-start flex-1 px-5 border-t border-b py-2 border-white/5 '>
          <CustomButton
            onClick={handleGenerateImage}
            withIcon={true}
            variant={"subtle"}
          >
            <Generate className='h-5 w-5 fill-white opacity-70' />
            Generate Image
          </CustomButton>
          <CustomButton
            onClick={handleNarrate}
            withIcon={true}
            variant={"subtle"}
          >
            <img
              src='/Icons/Narrate.svg'
              alt=''
              className='h-5 w-5 opacity-70'
            />
            Narrate
          </CustomButton>
          <SaveCharacterDialogue action={handleSaveCharacter}>
            <CustomButton withIcon={true} variant={"subtle"}>
              <Save className='h-5 w-5 fill-white opacity-70' />
              Save Character
            </CustomButton>
          </SaveCharacterDialogue>
        </div>
        <AdjustTextSize
          textSize={textSize}
          setTextSize={setTextSize}
          className='p-5'
        />
      </div>
    </>
  );
}
