"use client";
import React, { Suspense, useEffect, useState } from "react";
import Game from "@/components/game/gamepage/index";
import useGameStore from "@/utils/gameStore";
import Loader from "@/components/ui/Loader";
import { getGame, initiateGame } from "@/actions/game";
import useUserStore from "@/utils/userStore";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useCustomToast from "@/hooks/useCustomToast";
function GameHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const { invokeToast } = useCustomToast();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    currentCampaign,
    currentCharacter,
    setGame,
    game,
    setCurrentCharacter,
    setCurrentCampaign,
  } = useGameStore();
  const { user, setBlueCredits, setYellowCredits } = useUserStore();
  const [response, setResponse] = useState();

  const handleInitiateGame = async () => {
    console.log("currentCampaign", currentCampaign);
    console.log("currentCharacter", currentCharacter);
    try {
      const { game, credits, character } = await initiateGame(
        {
          campaignId: currentCampaign._id,
          characterId: currentCharacter._id,
        },
        user?.token
      );

      setResponse(game.state);
      setBlueCredits(credits.blue);
      setYellowCredits(credits.yellow);
      setGame(game);
      setCurrentCharacter(character);
      //push to the game page with the game id
      router.push(`${pathname}?id=${game._id}`);
    } catch (error) {
      invokeToast(error?.response?.data || "Error Initiating Game", "Error");
      router.push("/discover");
      console.log(error);
    }
  };

  const handleGetGame = async () => {
    try {
      const { game, character, campaign } = await getGame(id, user?.token);
      setGame(game);
      setResponse(game?.state);
      setCurrentCharacter(character);
      setCurrentCampaign(campaign);
    } catch (error) {
      invokeToast(error?.response?.data || "Error Fetching Game", "Error");
      router.push("/discover");

      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      handleGetGame();
    }
    if (!user?.token || id) return;

    handleInitiateGame();
  }, [user?.token]);

  if (!response) {
    return <Loader text='Loading Game ...' />;
  }
  return (
    <div className='pt-[128px] h-screen !z-[10] text-white relative'>
      <Game response={response} />
    </div>
  );
}

export default function page() {
  return (
    <Suspense fallback={null}>
      <GameHandler />
    </Suspense>
  );
}
