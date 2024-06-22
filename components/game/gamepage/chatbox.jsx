import React from "react";
import CustomIconbutton from "@/components/ui/custom-iconbutton";

export default function chatbox() {
  return (
    <div className="relative w-3/4 h-[55vh] overflow-auto hide-scrollbar  flex flex-col gap-2">
      <div
        className={
          "absolute pointer-events-none opacity-70 blur top-[-25%] left-0 ease-animate translate-y-[-50%] z-10  h-full flex items-center justify-start px-10 w-full top-gradient"
        }
      ></div>
      <div className="flex flex-col gap-4 justify-start items-start">
        <div className="flex gap-2 justify-start items-center">
          <CustomIconbutton variant={"primary"} className={"h-6 w-6"}>
            <img
              src="/images/CreateCharacter/CharacterName/CharacterName.png"
              alt="logo"
              className="h-full w-full rounded-full object-cover"
            />
          </CustomIconbutton>
          <span className="running-text-mono text-gray2">NAME</span>
        </div>
        <span>input or answer here</span>
      </div>
      <div className="flex flex-col gap-4 justify-start items-start">
        <div className="flex gap-2 justify-start items-center">
          <CustomIconbutton variant={"primary"} className={"h-6 w-6"}>
            <img
              src="/images/CreateCharacter/CharacterName/CharacterName.png"
              alt="logo"
              className="h-full w-full rounded-full object-cover"
            />
          </CustomIconbutton>
          <span className="running-text-mono text-gray2">NAME</span>
        </div>
        <span>input or answer here</span>
      </div>
    </div>
  );
}
