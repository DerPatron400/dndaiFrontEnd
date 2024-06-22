import React from "react";
import Card from "@/components/ui/Shared/Card/character";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import Chatbox from "./chatbox";
import BottomMenu from "./bottomMenu";

export default function index() {
  return (
    <div className=" border-white  w-full flex gap-10 bg-gradient pt-[130px] md:pt-[0px] px-6 lg:px-12 md:pb-64 ">
      <div className="w-1/4  flex flex-col gap-3 pt-10">
        <span className="running-text-mono text-gray2">CAMPAIGN</span>
        <span className="headline-4">
          Realms Reborn: Chronicles of the Eternal Quest
        </span>
        <Card />
      </div>
      <div className="w-3/4 ">
        <div className=" flex flex-col gap-3 w-full">
          <Chatbox />

          <CustomInputIcon
            className={"! w-3/4"}
            placeholder="What Would You Do?"
            icon={
              <img src="/Icons/ArrowUp.svg" alt="chat" className="h-5 w-5" />
            }
          />
          <BottomMenu />
        </div>
      </div>
    </div>
  );
}
