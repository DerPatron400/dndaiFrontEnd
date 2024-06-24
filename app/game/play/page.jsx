"use client";
import React, { useEffect, useState } from "react";
import Game from "@/components/game/gamepage/index";
import useGameStore from "@/utils/gameStore";
import Loader from "@/components/ui/Loader";
import { initiateGame } from "@/actions/game";
import useUserStore from "@/utils/userStore";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { currentCampaign, currentCharacter, setGame, game } = useGameStore();
  const { user, setBlueCredits, setYellowCredits } = useUserStore();
  const [response, setResponse] = useState();

  const handleInitiateGame = async () => {
    const { responseText, game, credits } = await initiateGame(
      {
        campaignId: currentCampaign._id,
        characterId: currentCharacter._id,
      },
      user?.token
    );
    setResponse(responseText);
    setBlueCredits(credits.blue);
    setYellowCredits(credits.yellow);
    setGame(game);
    //push to the game page with the game id
    router.push(`${pathname}?id=${game._id}`);
  };
  useEffect(() => {
    if (id) {
     
      setResponse(game?.state);
    }
    if (!user?.token || id) return;

    handleInitiateGame();
  }, [user?.token]);

  if (!response) {
    return <Loader text='Loading Game...' />;
  }
  return (
    <div className='pt-[128px] h-screen !z-[10] text-white relative'>
      <Game response={response} />
    </div>
  );
}
