"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Shared/Card/character";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import Chatbox from "./chatbox";
import BottomMenu from "./bottomMenu";
import useGameStore from "@/utils/gameStore";
import useUserStore from "@/utils/userStore";
import { addChoice } from "@/actions/game";

import Loader from "@/components/ui/Loader";
import useCustomToast from "@/hooks/useCustomToast";
import useControlsStore from "@/utils/controlsStore";
import { getCredits } from "@/actions/character";
export default function index({
  response,
  gameCharacter,
  setGameCharacter,
  gameCampaign,
}) {
  const { currentCampaign, game, setGame } = useGameStore();
  const { user, setYellowCredits, setBlueCredits } = useUserStore();
  const { setShowCreditsDialogue } = useControlsStore();
  const { invokeToast } = useCustomToast();
  const [input, setInput] = useState("");
  const [textSize, setTextSize] = useState(19);
  const [saveCharacterLoading, setSaveCharacterLoading] = useState(false);
  const [imageViewDialog, setImageViewDialog] = useState(false);
  const [narrate, setNarrate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [moveChatUp, setMoveChatUp] = useState(false);
  const [chat, setChat] = useState([
    {
      type: "system",
      text: response,
    },
  ]);
  console.log(game);

  const handleChat = async (text) => {
    if (user.blueCredits < 1) {
      setShowCreditsDialogue(true);
      return;
    }
    try {
      setLoading(true);
      //choose random number between 1-20
      const roll = Math.floor(Math.random() * 20) + 1;
      const payload = {
        userInput: text + ", Roll: " + roll,
        characterId: game.characterId,
        campaignId: game.campaignId,
        gameId: game._id,
      };
      const {
        game: _game,
        responseText,
        credits,
      } = await addChoice(payload, user?.token);

      setGame(_game);

      setChat((prev) => [
        ...prev,
        {
          type: "system",
          text: responseText,
        },
      ]);
    } catch (error) {
      console.log(error);
      invokeToast(
        error?.response?.data?.error || "Something Went Wrong",
        "error"
      );
    } finally {
      const { credits } = await getCredits(user?.token);
      setYellowCredits(credits.yellowCredits);
      setBlueCredits(credits.blueCredits);
      setLoading(false);
    }
  };

  return (
    <>
      {(saveCharacterLoading || isImageLoading) && (
        <Loader
          text={isImageLoading ? "Generating Image..." : "Saving Character..."}
          className="absolute top-0 z-[40] left-0 max-h-screen h-screen w-screen bg-blur-bottom-menu flex items-center justify-center"
        />
      )}
      <div
        className={
          "absolute pointer-events-none  top-0 left-0 ease-animate  z-[9]   flex items-center justify-start   w-screen "
        }
      >
        <img
          src="/images/Game/gradient.png"
          alt="gradient"
          className="w-full h-52 lg:h-full lg:object-contain"
        />
      </div>
      <div
        suppressHydrationWarning
        className="     w-full flex gap-10  px-6 lg:px-12  pb-32 lg:pb-12 h-screen fixed z-[8] overflow-y-scroll hide-scrollbar text-white "
      >
        <div className="w-1/4  b h-full hidden lg:flex flex-col gap-3  z-30 pt-[40px] lg:pt-[128px]">
          <span className="running-text-mono text-gray2">CAMPAIGN</span>
          <span className="headline-4 mb-3">{gameCampaign?.title}</span>
          <Card character={gameCharacter} />
        </div>
        <div className="w-full lg:w-3/4  z-10  h-full ">
          <div className=" flex relative   flex-col  h-full gap-3 w-full pt-[40px] ">
            <Chatbox
              textSize={textSize}
              loading={loading}
              chat={chat}
              character={gameCharacter}
              setImageViewDialog={setImageViewDialog}
              moveChatUp={moveChatUp}
            />

            <div className="flex flex-col-reverse lg:flex-col gap-5 lg:gap-3 fixed bottom-0 left-0 w-screen bg-blur-bottom-menu lg:bg-transparent lg:backdrop-filter-none px-6 lg:p-0 py-5 lg:relative lg:w-full ">
              <CustomInputIcon
                // blurOnOutsideClick={true}
                value={input}
                disabled={loading}
                onChange={(e) => setInput(e)}
                onClick={() => {
                  if (user.blueCredits < 1) {
                    setTimeout(() => {
                      setShowCreditsDialogue(true);
                    }, 300);
                    return;
                  }
                  setChat((prev) => [
                    ...prev,
                    {
                      type: "player",
                      text: input,
                    },
                  ]);
                  setMoveChatUp((prev) => !prev);
                  setInput("");
                  handleChat(input);
                }}
                className={"w-full lg:w-[65%] h-[64px] lg:h-[80px] "}
                textAreaClassName={
                  " h-[64px] lg:h-[80px] pt-[22px] lg:py-[28px]"
                }
                placeholder="What Would You Do?"
                icon={
                  <img
                    src="/Icons/ArrowUp.svg"
                    alt="chat"
                    className="h-5 w-5"
                  />
                }
              />

              <BottomMenu
                setChat={setChat}
                textSize={textSize}
                setTextSize={setTextSize}
                imageViewDialog={imageViewDialog}
                setImageViewDialog={setImageViewDialog}
                loading={saveCharacterLoading}
                setLoading={setSaveCharacterLoading}
                narrate={narrate}
                setNarrate={setNarrate}
                setGameCharacter={setGameCharacter}
                isImageLoading={isImageLoading}
                setIsImageLoading={setIsImageLoading}
                gameCharacter={gameCharacter}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
