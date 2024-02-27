"use client";
import React, { useState, useEffect } from "react";
import useGameStore from "@/utils/store/introTextStore";
import { useSearchParams } from "next/navigation";
import { parseGameText } from "@/utils/parseText";
import Input from "./Input";
import { twMerge } from "tailwind-merge";
import { Tooltip } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
export default function index() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const { introText, image, setPlayAudio, playAudio, chatAvatar, character } =
    useGameStore((state) => state);
  const { visualText, resultArray, paths, stats, originalTextWithoutAtLines } =
    parseGameText(introText);

  const conversationIndex = searchParams.get("conversationIndex");

  useEffect(() => {
    const allResponseText = resultArray
      .map((message) => {
        if (message.heading) {
          return message.heading + "\n\n" + message.content;
        }
      })
      .join("\n\n");

    if (visualText) {
      setMessages((prev) => [
        ...prev,
        {
          heading: "Visual",
          text: visualText.split("\n").join("\n\n\n"),
          isUser: false,
        },
      ]);
    }
    setMessages((prev) => [
      ...prev,
      {
        text: originalTextWithoutAtLines.split("\n").join("\n\n\n"),
        isUser: false,
      },
    ]);

    setPlayAudio(false);
    //scroll to end of screen
    setTimeout(() => {
      const element = document.querySelector(".chat-container");
      element.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 500);
  }, [introText]);

  useEffect(() => {
    if (image) {
      setMessages((prev) => [
        ...prev,
        {
          image: image,
          isUser: false,
          isImage: true,
        },
      ]);
      //scroll to end of screen
      setTimeout(() => {
        const element = document.querySelector(".chat-container");
        element.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 500);
    }
  }, [image]);

  return (
    <div className='text-white  pb-20 poppins grid grid-cols-12  chat-container'>
      <div className='col-span-12 md:col-span-3  flex justify-center gap-y-10'>
        <div className=' w-1/2 md:fixed  md:w-full h-[20vh] md:h-[35vh] mt-8  flex flex-col justify-center items-center'>
          <div className='relative h-full '>
            <img
              src='/images/frameCharacter.png'
              alt=''
              className=' h-[70%]  relative md:w-full md:h-full !z-[10]'
            />

            <img
              src={chatAvatar}
              alt=''
              className=' absolute w-[60%] h-[60%] top-[15%] left-[20%] !z-[3] object-cover rounded-md '
            />

            <Tooltip
              content='Open up stats'
              side='top'
              className='absolute top-0 right-0'
            >
              <div className='cursor-pointer h-[8%] w-[10%] rounded-full bg-gradient-to-r opacity-0 from-violet-200 to-purple-900 absolute bottom-[13%] left-[45%]'></div>
            </Tooltip>
          </div>
          <span className='text-center -mt-8 md:mt-2 '>{character}</span>
        </div>
      </div>
      <div className='col-span-12 md:col-span-9 px-5 h-[80vh] md:full overflow-y-auto'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={twMerge(
              "w-full flex flex-col items-start gap-y-3  mt-8"
            )}
          >
            <div
              className={twMerge("flex gap-x-3 justify-center items-center")}
            >
              <img
                src={message.isUser ? chatAvatar : "/Logo/white.png"}
                className='w-8 h-8 rounded-full'
              />
              <span>
                {message.isUser ? `${character}` : "DnDAi Dungeon Master"}
              </span>
            </div>
            {message.isImage ? (
              <img
                src={message.image}
                alt=''
                className='w-[90%] h-[30vh] md:h-[40vh]  rounded-lg'
              />
            ) : (
              <div
                className={twMerge(
                  "max-w-[90%] w-fit  gap-y-2 border  border-green-200 p-5 py-3  rounded-lg flex flex-col"
                )}
              >
                <div key={index} className='flex flex-col gap-y-1'>
                  <span className='text-lg font-light text-green-500'>
                    {message.heading}
                  </span>
                  <ReactMarkdown className='text-sm'>
                    {message.text}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Input
        visualText={visualText}
        query={query}
        setQuery={setQuery}
        setMessages={setMessages}
      />
    </div>
  );
}
