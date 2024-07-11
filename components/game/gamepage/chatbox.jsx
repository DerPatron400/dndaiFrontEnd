import React, { useEffect, useRef } from "react";

import CustomIconbutton from "@/components/ui/custom-iconbutton";
import useGameStore from "@/utils/gameStore";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

const TEXT_SIZES = {
  17: "text-xs",
  18: "text-sm",
  19: "",
  20: "text-lg",
  21: "text-xl",
  22: "text-2xl",
};

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1">
      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></div>
      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-300"></div>
    </div>
  );
};

export default function chatbox({
  chat,
  character,
  loading,
  textSize,
  setImageViewDialog,
}) {
  const { currentCharacter, setGameImage } = useGameStore();
  const chatboxRef = useRef(null);

  useEffect(() => {
    //scroll to bottom of chatbox smoothly
    chatboxRef.current.scrollTo({
      top: chatboxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat]);

  const handleViewImage = (url) => {
    setGameImage(url);
    setImageViewDialog(true);
  };
  return (
    <div
      ref={chatboxRef}
      className="relative chat-box w-[65%] h-full overflow-auto hide-scrollbar  flex flex-col gap-8 py-8 "
    >
      {chat.map((item, index) => {
        return item.type === "image" ? (
          <div
            onClick={() => handleViewImage(item.url)}
            key={index}
            className="h-[223px] w-full"
          >
            <img
              src={item.url}
              className=" h-full object-contain rounded-[16px] border border-white/10 hover:shadow-custom-1 "
            />
          </div>
        ) : (
          <div
            key={index}
            className={"flex flex-col gap-4 justify-start items-start  w-full "}
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
                  alt="logo"
                  className="h-full w-full rounded-full object-cover"
                />
              </CustomIconbutton>
              <span className={"running-text-mono uppercase text-gray2"}>
                {item.type === "system"
                  ? "DNDAI Dungeon Master"
                  : currentCharacter?.personal.name}
              </span>
            </div>
            {item.type === "system" ? (
              <ReactMarkdown
                className={cn("markdown-text ", TEXT_SIZES[textSize])}
              >
                {item.text}
              </ReactMarkdown>
            ) : (
              <span
                className={cn(
                  "font-helvetica-now-display",
                  TEXT_SIZES[textSize]
                )}
              >
                {item.text}
              </span>
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
                alt="logo"
                className="h-full w-full rounded-full object-cover"
              />
            </CustomIconbutton>
            <span className={"running-text-mono uppercase text-gray2"}>
              DNDAI Dungeon Master
            </span>
          </div>
          <TypingIndicator />
        </div>
      )}
    </div>
  );
}
