"use client";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

import AOS from "aos";
import "aos/dist/aos.css";
import useUserStore from "@/utils/store/userStore";
import axios from "axios";
import useIntroTextStore from "@/utils/store/introTextStore";
import { useRouter } from "next/navigation";
import Loader from "../shared/DragonLoader";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const continueGame = async (conversationIndex, user) => {
  const bodyData = {
    conversationIndex,
  };

  console.log("here");
  const response = await axios.post(
    BACKEND_URL + "/gpt4/continue-game",
    bodyData,
    {
      params: {
        _id: user._id,
      },
    }
  );

  console.log(response);

  return response.data;
};

const SaveGame = ({ data }) => {
  const [userName, setUserName] = useState("");
  const { user } = useUserStore((state) => state);
  const { setIntroText } = useIntroTextStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  console.log(data);
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    setUserName(user?.username);
  }, [user]);

  const startGame = () => {
    if (!user) {
      toast.error("Please login to play the game");
      return;
    }

    router.push("/input");
  };

  const handleClick = async (savedGame) => {
    setIsLoading(true);

    setIntroText(savedGame.summary);

    router.push(
      "/newgame?conversationIndex=" + savedGame.id + "&savedGame=true"
    );
  };

  return (
    <div className=' border  border-[#393a3b] rounded-md shadow-lg w-full sm:w-[70vw] mx-auto h-full min-h-screen  text-white overflow-hidden'>
      {/* Header Section */}
      <div className="relative flex flex-col items-center">
        <img
          src="/dice2.jpg"
          alt="Header Image Alt Text"
          className="w-full h-[30vh] object-cover mb-4 rounded-md"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>

        <h1 className="text-[2rem] sm:text-[3rem] text-center font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          Your Quest Awaits,{" "}
          <span className="text-green-500 capitalize">{userName}</span>!
        </h1>
      </div>

      <div>
        <div className='bg-black p-4 sm:p-8'>
          {data?.length > 0 ? (
            data.map((savedGame, index) => {
              return (
                <div
                  key={index}
                  data-aos='fade-right'
                  className='mb-4 border-l-4 border-green-500 pl-4'
                >
                  <h2
                    onClick={() => handleClick(savedGame)}
                    className='cursor-pointer hover:text-green-500 duration-300 transition-colors text-lg sm:text-xl font-bold mb-2'
                  >
                    Character Name: {savedGame.title}
                  </h2>
                  {isLoading && <Loader text={"Resuming your quest.."} />}
                  <p>{savedGame.summary}</p>
                </div>
              );
            })
          ) : (
            <div className='flex flex-col w-full items-center pt-[20%] gap-y-2'>
              <span className='opacity-60'>
                No Saved Games yet, start your adventure{" "}
              </span>
              <button
                onClick={startGame}
                className='bg-green-500 text-white px-4 py-2 rounded-md mb-2 sm:mb-2 hover:bg-green-600 focus:outline-none transition-colors duration-300'
              >
                Play Game
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaveGame;
