"use client";
import React, { useState, useEffect } from "react";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import CustomButton from "@/components/ui/custom-button";
import { useRouter } from "next/navigation";
import Play from "@/components/ui/Icons/Play";
import Add from "@/components/ui/Icons/Add";
import CampaignAdd from "@/components/ui/Icons/CampaignAdd";
import AddUser from "@/components/ui/Icons/AddUser";
import { getCharacter } from "@/actions/character";
import { getCampaignBySlug } from "@/actions/campaigns";
import { cn } from "@/lib/utils";
import useGameStore from "@/utils/gameStore";
import SoundButton from "@/components/ui/Shared/SoundButton";
import useCustomToast from "@/hooks/useCustomToast";
import { isSelectionValid } from "@/lib/Helpers/shared";
import { usePathname } from "next/navigation";
import useUserStore from "@/utils/userStore";
export default function CampaignTabBar({ campaign }) {
  const router = useRouter();
  const {
    setCurrentCharacter,
    setCurrentCampaign,
    currentCharacter,
    characterSelectTime,
  } = useGameStore();
  const { user } = useUserStore();
  const pathname = usePathname();
  const { invokeToast } = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const detectClickOutside = (e) => {
    if (showButtons) {
      if (!e.target.closest(".btns-menu")) {
        setShowButtons(false);
      }
    }
  };

  const handlePlayWithCampaign = async () => {
    try {
      setIsLoading(true);
      const campaignId = pathname.split("/").pop();

      const { campaign, hasSingleCharacter, characterId } =
        await getCampaignBySlug(campaignId, user?.token);

      setCurrentCampaign(campaign);

      if (hasSingleCharacter) {
        const { character } = await getCharacter(characterId, user?.token);

        setCurrentCharacter(character);
        router.push("/game/play");
        return;
      }
      if (!isSelectionValid(currentCharacter, characterSelectTime)) {
        router.push("/game/character-selection");
      } else {
        router.push("/game/play");
      }
    } catch (error) {
      invokeToast(error?.response?.data || "Error playing campaign", "Error");
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = (path) => {
    router.push(path);
  };
  useEffect(() => {
    document.addEventListener("click", detectClickOutside);

    return () => {
      document.removeEventListener("click", detectClickOutside);
    };
  }, [showButtons]);

  return (
    <div className='z-[10]  text-white fixed bottom-0 left-0 bg-blur-bottom-menu w-full flex  justify-center items-center  md:hidden '>
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
            <CustomButton
              onClick={() => handleRedirect("/character/create")}
              variant={"subtle"}
            >
              <AddUser className='h-5 w-5 fill-white opacity-70' />
              Create Character
            </CustomButton>
          </div>
          <div>
            <CustomButton
              onClick={() => handleRedirect("/campaign/create")}
              variant={"subtle"}
            >
              <CampaignAdd className='h-5 w-5 fill-white opacity-70' />
              Create Campaign
            </CustomButton>
          </div>
        </div>
        <div className='flex justify-between items-center w-full '>
          <div className='flex items-center gap-5'>
            <SoundButton />
            <CustomIconbutton onClick={() => setShowButtons((prev) => !prev)}>
              <Add className='h-5 w-5 fill-white' />
            </CustomIconbutton>
          </div>
          <CustomButton
            variant={"primary"}
            onClick={handlePlayWithCampaign}
            disabled={isLoading}
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
