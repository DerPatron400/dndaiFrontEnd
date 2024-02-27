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
  const { visualText, resultArray, paths, stats } = parseGameText(introText);

  const markdownText = `
    **This is a bold heading**
    
    This is a paragraph with *italic* text.
    
    Another paragraph with some code:

    \`\`\`javascript
    const greeting = 'Hello, world!';
    console.log(greeting);
    \`\`\`
  `;
  const conversationIndex = searchParams.get("conversationIndex");

  useEffect(() => {
    const allResponseText = resultArray
      .map((message) => {
        if (message.heading) {
          return message.heading + "\n\n" + message.content;
        }
      })
      .join("\n\n");
    setMessages((prev) => [
      ...prev,
      {
        text: introText.split("\n").join("\n\n\n"),
        isUser: false,
      },
    ]);
  }, [introText]);

  console.log("messages", messages);

  return (
    <div className='text-white flex pb-20 poppins chat-container'>
      <div className='w-[30%] flex justify-center'>
        <div className=' w-1/2 h-[35vh] mt-10 flex flex-col justify-center items-center'>
          <div className='relative'>
            <img
              src='/images/frameCharacter.png'
              alt=''
              className='w-full h-full'
            />
            <div className='absolute w-[54%] h-[54%] top-[15%] left-[22%]'>
              <img src={chatAvatar} alt='' className='w-full ' />
            </div>
            <Tooltip
              content='Open up stats'
              side='top'
              className='absolute top-0 right-0'
            >
              <div className='cursor-pointer h-[8%] w-[10%] rounded-full bg-gradient-to-r from-violet-200 to-purple-900 absolute bottom-[13%] left-[45%]'></div>
            </Tooltip>
          </div>
          <span className='text-center mt-2 text-xl font-bold '>
            {character}
          </span>
        </div>
        {/* <ReactMarkdown>{markdownText}</ReactMarkdown> */}
      </div>
      <div className='w-[70%] px-5 h-[80vh] overflow-y-auto'>
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
            <div
              className={twMerge(
                "max-w-[80%] w-fit  gap-y-2 border  border-green-200 p-5 py-3  rounded-lg flex flex-col"
              )}
            >
              <div key={index} className='flex flex-col gap-y-2'>
                <span className='text-lg font-light text-green-500'>
                  {message.heading}
                </span>
                <ReactMarkdown className='text-sm'>
                  {message.text}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Input query={query} setQuery={setQuery} setMessages={setMessages} />
    </div>
  );
}
