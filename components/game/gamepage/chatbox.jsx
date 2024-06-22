import React from "react";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import useGameStore from "@/utils/gameStore";

export default function chatbox({ chat }) {
  const { currentCharacter } = useGameStore();
  return (
    <div className='relative w-3/4 h-full overflow-auto hide-scrollbar  flex flex-col gap-8'>
      <div
        className={
          "absolute pointer-events-none opacity-70 blur top-[-25%] left-0 ease-animate translate-y-[-50%] z-10  h-full flex items-center justify-start px-10 w-full top-gradient"
        }
      ></div>
      {chat.map((item, index) => {
        return (
          <div
            key={index}
            className={
              "flex flex-col gap-4 justify-start items-start px-10 w-full"
            }
          >
            <div className={"flex gap-2 justify-start items-center"}>
              <CustomIconbutton variant={"primary"} className={"h-6 w-6"}>
                <img
                  src={
                    item.type === "system"
                      ? "/Icons/logo-profile.svg"
                      : character?.personal?.portraitUrl ||
                        "/images/CreateCharacter/CharacterName/CharacterName.png"
                  }
                  alt='logo'
                  className='h-full w-full rounded-full object-cover'
                />
              </CustomIconbutton>
              <span className='running-text-mono uppercase text-gray2'>
                {item.type === "system"
                  ? "DNDAI Dungeon Master"
                  : currentCharacter?.personal.name}
              </span>
            </div>
            <span className='font-helvetica-now-display'>{item.text}</span>
          </div>
        );
      })}
    </div>
  );
}
