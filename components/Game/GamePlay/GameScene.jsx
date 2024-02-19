// AtmosScene.js
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import GameLoop from "@/components/shared/GameLoop";
import { parseGameText } from "@/utils/parseText";
import useIntroTextStore from "@/utils/store/introTextStore";
import useUserStore from "@/utils/store/userStore";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Tooltip } from "@radix-ui/themes";
import HowToPlay from "./HowToPlay";
import Loader from "../StartGame/Loader";
import { saveGame } from "@/api/game";
import Stats from "./Stats";

export default function AtmosScene() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { introText, image, setPlayAudio, playAudio } = useIntroTextStore(
    (state) => state
  );
  const { user, setCredits } = useUserStore((state) => state);
  const [pages, setPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("text");
  const [isForwardPressed, setIsForwardPressed] = useState(false);
  const [isBackwardPressed, setIsBackwardPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const { visualText, resultArray, paths, stats } = parseGameText(introText);
  console.log(stats);

  const conversationIndex = searchParams.get("conversationIndex");

  const handleSaveGame = async () => {
    try {
      if (user.credits <= 0) {
        toast.error("You don't have enough credits to play");
        router.push("/shop");
        return;
      }

      const bodyData = {
        conversationIndex,
      };

      setIsLoading(true);
      const data = await saveGame(bodyData, user.token);
      setCredits(data.credits);
      toast.success("Game saved successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAudio = () => {
    setPlayAudio(true);
  };

  const addToScene = () => {
    setPages((prev) => prev + 1);
  };

  useEffect(() => {
    setPlayAudio(false);
  }, [introText]);

  const handleModal = () => {
    setModal(!modal);
    if (modal) {
      console.log("modal is open");
    }
  };

  return (
    <div className="relative">
      <div className="fixed top-0 border left-0 h-[100vh] w-screen">
        <Canvas className="z-[1]">
          <color attach="background" args={["#ececec"]} />

          <Suspense fallback={<Loader />}>
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
          </Suspense>
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

      <HowToPlay />
      <div className="fixed bottom-[3%] right-4 flex flex-col gap-y-2">
        <Tooltip content="Spend one credits to save your game" side="left">
          <button
            onClick={handleSaveGame}
            disabled={isLoading}
            className="bg-gradient-to-t from-green-950 disabled:pointer-events-none to-green-500 text-white disabled:cursor-not-allowed disabled:opacity-50 px-6 py-2  rounded-md hover:to-green-700 hover:from-green-400 transition-all"
          >
            {isLoading ? "Saving..." : "Save Game"}
          </button>
        </Tooltip>
        <Tooltip content="Narrates your Game" side="left">
          <button
            onClick={handlePlayAudio}
            disabled={playAudio}
            className="bg-gradient-to-t from-green-950 disabled:pointer-events-none to-green-500 text-white disabled:cursor-not-allowed disabled:opacity-50 px-6 py-2  rounded-md hover:to-green-700 hover:from-green-400 transition-all"
          >
            {"Play Audio"}
          </button>
        </Tooltip>
        <Tooltip content="view details of your game" side="left">
          <button
            onClick={handleModal}
            className="bg-gradient-to-t from-green-950 disabled:pointer-events-none to-green-500 text-white disabled:cursor-not-allowed disabled:opacity-50 px-6 py-2  rounded-md hover:to-green-700 hover:from-green-400 transition-all"
          >
            Stats
          </button>
        </Tooltip>
      </div>
      {modal && <Stats stats={stats} />}
    </div>
  );
}
