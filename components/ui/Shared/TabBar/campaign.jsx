"use client";
import React, { useState, useEffect } from "react";

import useSoundControls from "@/utils/controlsStore";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import CustomButton from "@/components/ui/custom-button";
import { useRouter } from "next/navigation";
import _ from "lodash";
import Play from "@/components/ui/Icons/Play";
import Add from "@/components/ui/Icons/Add";
import CampaignAdd from "@/components/ui/Icons/CampaignAdd";
import AddUser from "@/components/ui/Icons/AddUser";
import { cn } from "@/lib/utils";
import useGameStore from "@/utils/gameStore";

export default function CampaignTabBar({ campaign }) {
  const router = useRouter();
  const { isSoundOn, toggleSound } = useSoundControls();
  const { setCurrentCampaign, currentCharacter } = useGameStore();

  const [showButtons, setShowButtons] = useState(false);
  const detectClickOutside = (e) => {
    if (showButtons) {
      if (!e.target.closest(".btns-menu")) {
        setShowButtons(false);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", detectClickOutside);

    return () => {
      document.removeEventListener("click", detectClickOutside);
    };
  }, [showButtons]);

  const handlePlay = () => {
    setCurrentCampaign(campaign);
    console.log(currentCharacter);
    if (!currentCharacter) {
      router.push("/game/character-selection");
    } else {
      router.push("/game/play");
    }
  };

  return (
    <div className='z-[20]  text-white fixed bottom-0 left-0 bg-blur-bottom-menu w-full flex  justify-center items-center  md:hidden '>
      <div className='flex flex-col items-center gap-4 w-full relative p-5'>
        <hr
          className={cn(
            "w-9 border-[1px] rounded-sm border-gray1 text-gray1",
            !showButtons && "hidden"
          )}
        />
        <div
          className={cn(
            "border w-full flex flex-col btns-menu border-white/10 bg-white/10 rounded-[16px] gap-2 py-2 px-5",
            !showButtons && "hidden"
          )}
        >
          <div>
            <CustomButton variant={"subtle"}>
              <AddUser className='h-5 w-5 fill-white opacity-70' />
              Create Character
            </CustomButton>
          </div>
          <div>
            <CustomButton variant={"subtle"}>
              <CampaignAdd className='h-5 w-5 fill-white opacity-70' />
              Create Campaign
            </CustomButton>
          </div>
        </div>
        <div className='flex justify-between items-center w-full '>
          <div className='flex items-center gap-5'>
            <CustomIconbutton onClick={toggleSound}>
              <img
                src={isSoundOn ? "/Icons/Sound.svg" : "/Icons/SoundOff.svg"}
                alt='Sound Toggle'
                className='h-5 w-5 invert'
              />
            </CustomIconbutton>
            <CustomIconbutton onClick={() => setShowButtons((prev) => !prev)}>
              <Add className='h-5 w-5 fill-white' />
            </CustomIconbutton>
          </div>
          <CustomButton
            variant={"primary"}
            onClick={handlePlay}
            // disabled={!isValid() || loading}
            // onClick={handleCreateCampaign}
          >
            <Play className='h-5 w-5 fill-russianViolet' />
            Play campaign
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
