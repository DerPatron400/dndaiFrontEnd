// AtmosScene.js
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import GameLoop from "@/components/shared/GameLoop";
import { parseGameText } from "@/utils/parseText";
import useIntroTextStore from "@/utils/store/introTextStore";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import useUserStore from "@/utils/store/userStore";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Tooltip } from "@radix-ui/themes";
import HowToPlay from "./HowToPlay";

export default function AtmosScene() {
  //states from store
  const { introText, image } = useIntroTextStore((state) => state);
  const [pages, setPages] = useState(1);

  const { visualText, resultArray, paths } = parseGameText(introText);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("text");
  const [isForwardPressed, setIsForwardPressed] = useState(false);
  const [isBackwardPressed, setIsBackwardPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setCredits } = useUserStore((state) => state);
  const searchParams = useSearchParams();
  const router = useRouter();
  console.log(introText);

  const conversationIndex = searchParams.get("conversationIndex");

  const handleSaveGame = async () => {
    try {
      if (user.credits <= 0) {
        toast.error("You don't have enough credits to play");
        router.push("/shop");
        return;
      }

      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const bodyData = {
        conversationIndex,
      };

      setIsLoading(true);
      const { data } = await axios.post(
        BACKEND_URL + "/api/savedGames/save-game",
        bodyData,
        {
          params: {
            _id: user._id,
          },
        }
      );

      setCredits(data.credits);
      toast.success("Game saved successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToScene = (type) => {
    setPages((prev) => prev + 1);
  };

  return (
    <div className="relative">
      <div className="fixed top-0 border left-0 h-[100vh] w-screen">
        <Canvas>
          <color attach="background" args={["#ececec"]} />

          <Experience
            textualData={{ visualText, resultArray, image }}
            pages={pages}
            setOpen={setOpen}
            open={open}
            type={type}
            setType={setType}
            isForwardPressed={isForwardPressed}
            isBackwardPressed={isBackwardPressed}
            setIsForwardPressed={setIsForwardPressed}
            setIsBackwardPressed={setIsBackwardPressed}
            visualText={visualText}
          />
        </Canvas>
      </div>

      <GameLoop
        open={open}
        setOpen={setOpen}
        addToScene={addToScene}
        type={type}
        visualText={visualText}
        paths={paths}
      />

      <div className="fixed bottom-20 left-0 w-screen h-[10vh] flex-col gap-y-2 items-start px-4 flex md:hidden">
        <button
          tabIndex={0}
          onTouchStart={() => {
            setIsForwardPressed(true);
            setIsBackwardPressed(false);
          }}
          onTouchEnd={() => {
            setIsForwardPressed(false);
            setIsBackwardPressed(false);
          }}
          className="bg-white text-black px-4 py-2 rounded-md"
        >
          <FaChevronUp size={20} />
        </button>
        <button
          onTouchStart={() => {
            setIsForwardPressed(false);
            setIsBackwardPressed(true);
            console.log("backward");
          }}
          onTouchEnd={() => {
            setIsForwardPressed(false);
            setIsBackwardPressed(false);
          }}
          className="bg-white text-black px-4 py-2 rounded-md"
        >
          <FaChevronDown size={20} />
        </button>
      </div>
      <HowToPlay />
      <div className="fixed bottom-[11%] right-4 ">
        <Tooltip content="Spend one credits to save your game" side="left">
          <button
            onClick={handleSaveGame}
            disabled={isLoading}
            className="bg-gradient-to-t from-green-950 disabled:pointer-events-none to-green-500 text-white disabled:cursor-not-allowed disabled:opacity-50 px-6 py-2 mb-2 sm:mb-2 rounded-md hover:to-green-700 hover:from-green-400 transition-all"
          >
            {isLoading ? "Saving..." : "Save Game"}
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
