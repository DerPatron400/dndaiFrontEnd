"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Shared/Card/character";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import Chatbox from "./chatbox";
import BottomMenu from "./bottomMenu";
import useGameStore from "@/utils/gameStore";
import useUserStore from "@/utils/userStore";
import { addChoice } from "@/actions/game";
import GameplayNavbar from "@/components/navigation/GameplayNavbar";
import Loader from "@/components/ui/Loader";

export default function index({ response }) {
  const { currentCampaign, currentCharacter, game, setGame } = useGameStore();
  const { user, setYellowCredits, setBlueCredits } = useUserStore();
  const [input, setInput] = useState("");
  const [textSize, setTextSize] = useState(19);
  const [saveCharacterLoading, setSaveCharacterLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([
    {
      type: "system",
      text: response,
    },
  ]);

  const handleChat = async (text) => {
    try {
      setLoading(true);
      //choose random number between 1-20
      const roll = Math.floor(Math.random() * 20) + 1;
      const payload = {
        userInput: text + ", Roll: " + roll,
        characterId: currentCharacter._id,
        campaignId: currentCampaign._id,
        gameId: game._id,
      };
      const {
        game: _game,
        responseText,
        credits,
      } = await addChoice(payload, user?.token);

      setGame(_game);
      setYellowCredits(credits.yellow);
      setBlueCredits(credits.blue);
      setChat((prev) => [
        ...prev,
        {
          type: "system",
          text: responseText,
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {saveCharacterLoading && (
        <Loader
          text='Saving Character...'
          className='absolute top-0 z-[40] left-0 h-screen w-screen bg-blur-x flex items-center justify-center'
        />
      )}
      <GameplayNavbar
        loading={saveCharacterLoading}
        setLoading={setSaveCharacterLoading}
      />
      <div className=' border-white h-full   w-full flex gap-10  md:pt-[0px] px-6 lg:px-12  pb-12'>
        <div
          className={
            "absolute pointer-events-none opacity-70 blur top-[10%] left-0 ease-animate  z-20  h-16 flex items-center justify-start  w-screen top-gradient"
          }
        ></div>
        <div className='w-1/4   h-full flex flex-col gap-3 pt-8'>
          <span className='running-text-mono text-gray2'>CAMPAIGN</span>
          <span className='headline-4'>{currentCampaign?.title}</span>
          <Card character={currentCharacter} />
        </div>
        <div className='w-3/4  z-10 h-full '>
          <div className=' flex flex-col  h-full gap-3 w-full'>
            <Chatbox
              textSize={textSize}
              loading={loading}
              chat={chat}
              character={currentCharacter}
            />

            <CustomInputIcon
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e)}
              onClick={() => {
                setChat((prev) => [
                  ...prev,
                  {
                    type: "player",
                    text: input,
                  },
                ]);
                setInput("");
                handleChat(input);
              }}
              className={"w-[65%] "}
              placeholder='What Would You Do?'
              icon={
                <img src='/Icons/ArrowUp.svg' alt='chat' className='h-5 w-5' />
              }
            />
            <BottomMenu textSize={textSize} setTextSize={setTextSize} />
          </div>
        </div>
      </div>
    </>
  );
}
