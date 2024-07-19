import React, { useState } from "react";
import CustomButton from "../custom-button";
import { getCharacters } from "@/actions/character";
import { useRouter } from "next/navigation";
import { isSelectionValid } from "@/lib/Helpers/shared";
import useGameStore from "@/utils/gameStore";
import useCustomToast from "@/hooks/useCustomToast";
import useUserStore from "@/utils/userStore";
import Play from "../Icons/Play";
export default function PlayForFreeMobile({ playNow }) {
  const router = useRouter();
  const { user } = useUserStore();
  const { invokeToast } = useCustomToast();

  const { setCurrentCharacter, currentCampaign, campaignSelectTime } =
    useGameStore();
  const [isLoading, setIsLoading] = useState(false);
  const handlePlay = async () => {
    try {
      setIsLoading(true);
      const { characters } = await getCharacters(user?.token);
      if (characters.length === 0) {
        router.push("/character/create");
        return;
      } else if (characters.length === 1) {
        setCurrentCharacter(characters[0]);
        if (!isSelectionValid(currentCampaign, campaignSelectTime)) {
          router.push("/game/campaign-selection");
        } else {
          router.push("/game/play");
        }
        return;
      } else {
        router.push("/game/character-selection");
      }
    } catch (error) {
      invokeToast("Error fetching characters", "Error");
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomButton disabled={isLoading} onClick={handlePlay} variant={"primary"}>
      {playNow && <Play className='h-5 w-5 opacity-70' />}
      {playNow ? "Play Now" : "Play for free"}
    </CustomButton>
  );
}
