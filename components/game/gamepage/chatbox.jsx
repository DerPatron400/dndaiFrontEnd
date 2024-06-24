import React, { useEffect, useRef } from "react";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import useGameStore from "@/utils/gameStore";
import ReactMarkdown from "react-markdown";

const TypingIndicator = () => {
  return (
    <div className='flex items-center space-x-1'>
      <div className='w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce'></div>
      <div className='w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150'></div>
      <div className='w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-300'></div>
    </div>
  );
};
export default function chatbox({ chat, character, loading }) {
  const { currentCharacter } = useGameStore();
  const chatboxRef = useRef(null);

  useEffect(() => {
    //scroll to bottom of chatbox smoothly
    chatboxRef.current.scrollTo({
      top: chatboxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat]);
  return (
    <div
      ref={chatboxRef}
      className='relative w-3/4 h-full overflow-auto hide-scrollbar  flex flex-col gap-8 py-8 '
    >
      {chat.map((item, index) => {
        return (
          <div
            key={index}
            className={"flex flex-col gap-4 justify-start items-start  w-full"}
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
            {item.type === "system" ? (
              <ReactMarkdown className='markdown-text'>
                {item.text}
              </ReactMarkdown>
            ) : (
              <span className='font-helvetica-now-display'>{item.text}</span>
            )}
          </div>
        );
      })}

      {loading && (
        <div
          className={"flex flex-col gap-4 justify-start items-start  w-full"}
        >
          <div className={"flex gap-2 justify-start items-center"}>
            <CustomIconbutton variant={"primary"} className={"h-6 w-6"}>
              <img
                src={"/Icons/logo-profile.svg"}
                alt='logo'
                className='h-full w-full rounded-full object-cover'
              />
            </CustomIconbutton>
            <span className='running-text-mono uppercase text-gray2'>
              DNDAI Dungeon Master
            </span>
          </div>
          <TypingIndicator />
        </div>
      )}
    </div>
  );
}
