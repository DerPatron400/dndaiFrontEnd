"use client";
import React, { useState, useEffect } from "react";
import { BackgroundScene } from "@/components/shared/BackgroundScene";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import useUserStore from "@/utils/store/userStore";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import AOS from "aos";
import { IoIosArrowDown } from "react-icons/io";
import { getCredits } from "@/api/user";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const [showInstructions, setShowInstructions] = useState(false);
  const { user, setCredits } = useUserStore((state) => state);
  const cookies = new Cookies();

  useEffect(() => {
    const fetchCredts = async (id) => {
      const credits = await getCredits(id);
      console.log(credits);
      setCredits(credits);
    };
    if (user) {
      fetchCredts(user._id);
    }
  }, []);

  useEffect(() => {
    if (user) {
      cookies.set("uid", user._id, { path: "/" });
    }
  }, [user]);
  const startGame = () => {
    if (!user) {
      toast.error("Please login to play the game");
      return;
    }
    // console.log(user.credits);
    if (user.credits <= 0) {
      router.push("/shop");
      return;
    }

    router.push("/game/new");
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="relative h-screen bg-black z-[1]">
      <BackgroundScene setLoaded={setLoaded} />
      {loaded && (
        <div className="relative top-0 left-0 w-[100vw] h-full flex justify-center items-center">
          <div className="w-[100vw] p-4 sm:p-8 mx-auto flex flex-col justify-center items-center">
            <h1 className="text-xl neon-text sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center text-white relative z-[14]">
              <span className="text-white">
                Welcome to <span className="text-green-500">DnDAI</span>{" "}
                Adventures!
              </span>
            </h1>
            <div className="flex flex-col w-[80vw] sm:w-[20vw] z-[14]">
              <button
                onClick={startGame}
                className="bg-gradient-to-t from-green-950 to-green-500 text-white px-6 py-2 mb-2 sm:mb-2 rounded-md hover:to-green-700 hover:from-green-400 transition-all"
              >
                Play Game
              </button>
              {/* <button
                onClick={toggleInstructions}
                className="bg-gradient-to-t from-green-950 to-green-500 text-white px-6 py-2 mb-2 sm:mb-2 rounded-md hover:to-green-700 hover:from-green-400 transition-all"
              >
                Show Instructions
              </button> */}
            </div>
            {/* {showInstructions && (
              <InstructionsModal onClose={toggleInstructions} />
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}
