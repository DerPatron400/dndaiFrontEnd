"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Shared/Card/character";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import Chatbox from "./chatbox";
import BottomMenu from "./bottomMenu";
import useGameStore from "@/utils/gameStore";

export default function index({ response }) {
  const { currentCampaign, currentCharacter } = useGameStore();
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([
    {
      type: "system",
      text: response,
    },
  ]);

  return (
    <div className=' border-white h-full   w-full flex gap-10  md:pt-[0px] px-6 lg:px-12  pb-12'>
      <div className='w-1/4   h-full flex flex-col gap-3 pt-8'>
        <span className='running-text-mono text-gray2'>CAMPAIGN</span>
        <span className='headline-4'>{currentCampaign?.title}</span>
        <Card character={currentCharacter} />
      </div>
      <div className='w-3/4  z-10 h-full '>
        <div className=' flex flex-col  h-full gap-3 w-full'>
          <Chatbox chat={chat} />

          <CustomInputIcon
            value={input}
            onChange={(e) => setInput(e)}
            onClick={() => {
              setChat([
                ...chat,
                {
                  type: "player",
                  text: input,
                },
              ]);
              setInput("");
            }}
            className={"! w-3/4"}
            placeholder='What Would You Do?'
            icon={
              <img src='/Icons/ArrowUp.svg' alt='chat' className='h-5 w-5' />
            }
          />
          <BottomMenu />
        </div>
      </div>
    </div>
  );
}
