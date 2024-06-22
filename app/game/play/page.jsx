"use client";
import React, { useEffect, useState } from "react";
import Game from "@/components/game/gamepage/index";
import useGameStore from "@/utils/gameStore";
import Loader from "@/components/ui/Loader";
import { initiateGame } from "@/actions/game";
import useUserStore from "@/utils/userStore";

export default function page() {
  const { currentCampaign, currentCharacter } = useGameStore();
  const { user, setBlueCredits, setYellowCredits } = useUserStore();
  const [response, setResponse] = useState();

  const handleInitiateGame = async () => {
    console.log("here");
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
  };
  useEffect(() => {
    console.log(user);
    if (!user?.token) return;

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
