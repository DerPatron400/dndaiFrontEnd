"use client";
import React, { useState, useEffect } from "react";
import useGameStore from "@/utils/store/introTextStore";
import { useSearchParams } from "next/navigation";
import { parseGameText } from "@/utils/parseText";
import Input from "./Input";
import { twMerge } from "tailwind-merge";

export default function index() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const { introText, image, setPlayAudio, playAudio, chatAvatar } =
    useGameStore((state) => state);
  const { visualText, resultArray, paths, stats } = parseGameText(introText);

  const conversationIndex = searchParams.get("conversationIndex");

  useEffect(() => {
    setMessages((prev) => [
      ...prev,
      {
        heading: "Visual",
        text: visualText,
        isUser: false,
      },
      ...resultArray.map((result) => ({
        heading: result.heading,
        text: result.content,
        isUser: false,
      })),
    ]);
  }, [introText]);

  return (
    <div className="text-white px-5 pb-20 w-[100%]  poppins chat-container">
      {messages?.map((message, index) => (
        <div
          className={twMerge(
            "w-full flex items-start gap-x-3  mt-3",
            message.isUser && "flex-row-reverse"
          )}
        >
          <img
            src={message.isUser ? chatAvatar : "/Logo/white.png"}
            className="w-8 h-8  rounded-full"
          />
          <div
            key={index}
            className={twMerge(
              "max-w-[60%] w-fit  gap-y-2 border  border-green-200 p-5 py-3  rounded-lg flex flex-col",
              message.isUser && "ms-auto py-2 px-4 border-white"
            )}
          >
            {message.heading && (
              <span className="text-lg text-green-200">
                {message.heading.replaceAll("*", "")}
              </span>
            )}

            <span>{message.text}</span>
          </div>
        </div>
      ))}
      <Input query={query} setQuery={setQuery} setMessages={setMessages} />
    </div>
  );
}
