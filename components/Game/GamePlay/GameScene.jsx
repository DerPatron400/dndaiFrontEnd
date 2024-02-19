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
import { LineChart, AudioLines, Save } from "lucide-react";

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
  const [showStats, setShowStats] = useState(false);

  const { visualText, resultArray, paths, stats } = parseGameText(introText);

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
    setShowStats(true);
  };

  return (
    <div className='relative poppins'>
      <div className='fixed top-0 border left-0 h-[100vh] w-screen'>
        <Canvas className='z-[1]'>
          <color attach='background' args={["#ececec"]} />

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
      <div className='fixed bottom-[3%] right-4 flex flex-col gap-y-2'>
        <Tooltip content='Spend one credits to save your game' side='left'>
          <button
            onClick={handleSaveGame}
            disabled={isLoading}
            className=' bg-white h-10 w-10 flex items-center justify-center  border-0 transition-all rounded-full disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed '
          >
            <Save size={18} />
          </button>
        </Tooltip>
        <Tooltip content='Narrates your Game' side='left'>
          <button
            onClick={handlePlayAudio}
            disabled={playAudio || isLoading}
            className=' bg-white h-10 w-10 flex items-center justify-center  border-0 transition-all rounded-full disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed '
          >
            <AudioLines size={18} />
          </button>
        </Tooltip>
      </div>
      <div className='fixed bottom-[3%] left-4 flex flex-col gap-y-2'>
        <Tooltip content='view details of your game' side='left'>
          <button
            onClick={handleModal}
            className=' bg-white h-10 w-10 flex items-center justify-center  border-0 transition-all rounded-full '
          >
            <LineChart size={18} />
          </button>
        </Tooltip>
      </div>

      <Stats stats={stats} show={showStats} setShow={setShowStats} />
    </div>
  );
}
