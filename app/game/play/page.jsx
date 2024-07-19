"use client";
import React, { Suspense, useEffect, useState } from "react";
import Game from "@/components/game/gamepage/index";
import useGameStore from "@/utils/gameStore";
import Loader from "@/components/ui/Loader";
import { getGame, initiateGame } from "@/actions/game";
import useUserStore from "@/utils/userStore";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useCustomToast from "@/hooks/useCustomToast";
import useControlsStore from "@/utils/controlsStore";
import { getCredits } from "@/actions/character";
function GameHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const { invokeToast } = useCustomToast();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [gameCampaign, setGameCampaign] = useState();
  const [gameCharacter, setGameCharacter] = useState();

  const {
    currentCampaign,
    currentCharacter,
    setGame,
    game,
    setCurrentCharacter,
    setCurrentCampaign,
  } = useGameStore();
  const { user, setBlueCredits, setYellowCredits } = useUserStore();
  const { setShowCreditsDialogue } = useControlsStore();
  const [response, setResponse] = useState();

  const handleInitiateGame = async () => {
    console.log(user, "user");
    if (user.blueCredits < 1) {
      console.log("here");
      setShowCreditsDialogue(true);

      return;
    }
    console.log("currentCampaign", currentCampaign);
    console.log("currentCharacter", currentCharacter);
    try {
      const { game, character } = await initiateGame(
        {
          campaignId: currentCampaign._id,
          characterId: currentCharacter._id,
        },
        user?.token
      );

      setResponse(game.state);

      setGame(game);
      setCurrentCharacter(null);
      setCurrentCampaign(null);
      setGameCharacter(character);

      //push to the game page with the game id
      router.push(`${pathname}?id=${game._id}`);
    } catch (error) {
      invokeToast(error?.response?.data || "Error Initiating Game", "Error");
      router.push("/discover");
      console.log(error);
    } finally {
      const { credits } = await getCredits(user?.token);
      setBlueCredits(credits.blueCredits);
      setYellowCredits(credits.yellowCredits);
    }
  };

  const handleGetGame = async () => {
    try {
      const { game, character, campaign } = await getGame(id, user?.token);
      setGame(game);
      setResponse(game?.state);
      setCurrentCharacter(null);
      setCurrentCampaign(null);
      setGameCharacter(character);
      setGameCampaign(campaign);
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
    <Game
      response={response}
      gameCharacter={gameCharacter}
      setGameCharacter={setGameCharacter}
      gameCampaign={gameCampaign}
    />
  );
}

export default function page() {
  return (
    <Suspense fallback={null}>
      <GameHandler />
    </Suspense>
  );
}
