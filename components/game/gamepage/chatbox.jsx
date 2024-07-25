import React, { useEffect, useRef, useState } from "react";

import CustomIconbutton from "@/components/ui/custom-iconbutton";
import useGameStore from "@/utils/gameStore";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import ArrowRight from "@/components/ui/Icons/ArrowRight";

//text sizes for chatbox
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
    <div className='flex items-center space-x-1'>
      <div className='w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce'></div>
      <div className='w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150'></div>
      <div className='w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-300'></div>
    </div>
  );
};

export default function chatbox({
  chat,
  character,
  loading,
  textSize,
  setImageViewDialog,
  moveChatUp,
}) {
  const { setGameImage } = useGameStore();
  const chatboxRef = useRef(null);
  const [isScrollLeft, setIsScrollLeft] = useState(false);

  useEffect(() => {
    //focus on last obj
    const lastObj = chatboxRef.current.querySelector(".last-obj");
    lastObj?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [chat]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        chatboxRef.current.scrollHeight - chatboxRef.current.scrollTop ===
        chatboxRef.current.clientHeight
      ) {
        setIsScrollLeft(false);
      } else {
        setIsScrollLeft(true);
      }
    };

    chatboxRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      chatboxRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleViewImage = (url) => {
    setGameImage(url);
    setImageViewDialog(true);
  };

  const scrollToBottom = () => {
    chatboxRef.current.scrollTo({
      top: chatboxRef.current.scrollHeight,
      behavior: "smooth", // You can also use 'auto' for an immediate scroll
    });
  };

  return (
    <div
      ref={chatboxRef}
      className='relative  chat-box w-full lg:w-[65%]  min-h-1/2 flex-1  overflow-y-scroll hide-scrollbar  flex flex-col  pb-40 pt-12 lg:py-12 lg:pt-32  '
    >
      <div className='flex relative w-full flex-col justify-end mt-auto gap-8'>
        <CustomIconbutton
          className={cn(
            "fixed  left-1/2  -translate-x-1/2 lg:translate-x-[0%] bottom-44 lg:bottom-52",
            !isScrollLeft && "opacity-0 pointer-events-none"
          )}
          variant={"primary"}
          onClick={scrollToBottom}
        >
          <ArrowRight className='h-5 w-5 rotate-90 fill-russianViolet' />
        </CustomIconbutton>
        {chat.map((item, index) => {
          return item.type === "image" ? (
            <div
              key={index}
              className={cn(
                "h-[223px] w-full",
                index === chat.length - 1 && "last-obj"
              )}
            >
              <img
                onClick={() => handleViewImage(item.url)}
                src={item.url}
                className=' h-full cursor-pointer object-contain rounded-[16px] border border-white/10 hover:shadow-custom-1 cursor-pointe ease-animate '
              />
            </div>
          ) : (
            <div
              key={index}
              className={cn(
                "flex flex-col gap-4 justify-start items-start  w-full ",
                index === chat.length - 1 && "last-obj"
              )}
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
                <span className={"running-text-mono uppercase text-gray2"}>
                  {item.type === "system"
                    ? "DNDAI Dungeon Master"
                    : character?.personal.name}
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
                  alt='logo'
                  className='h-full w-full rounded-full object-cover'
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
    </div>
  );
}
