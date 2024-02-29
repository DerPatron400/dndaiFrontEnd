import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { sendUserInput, saveGame } from "@/api/game";
import useUserStore from "@/utils/store/userStore";
import useGameStore from "@/utils/store/introTextStore";
import { Switch, Tooltip, Popover } from "@radix-ui/themes";
import { AudioLines, Save, Image, MoreVertical } from "lucide-react";
import toast from "react-hot-toast";

import GameLoop from "@/components/shared/GameLoop";

export default function Input({ query, setQuery, setMessages, visualText }) {
  const searchParams = useSearchParams();
  const conversationIndex = searchParams.get("conversationIndex");
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);
  const [rollDice, setRollDice] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [selectedFace, setSelectedFace] = useState(null);

  const { user, setCredits, setGreenCredits } = useUserStore((state) => state);
  const { setIntroText, setCharacter, setPlayAudio, playAudio, isGreen } =
    useGameStore((state) => state);

  //this is for rolling dice
  useEffect(() => {
    if (rollDice) {
      const fetchResponse = async () => {
        //generate random number between 1 to 20
        const randomNumber = selectedFace;
        const bodyData = {
          userInput: query,
          randomNumber,
          conversationIndex,
          isGreen,
        };

        setQuery("");

        try {
          setIsLoading(true);
          const data = await sendUserInput(bodyData, user.token);
          setIntroText(data.responseText);
          setCharacter(data.character);
          setCredits(data.credits.purple);
          setGreenCredits(data.credits.green);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
          setIsLoadingAnimation(false);
          setOpen(false);
        }
      };
      fetchResponse();
      setTimeout(async () => {
        setRollDice(false);
        setIsLoadingAnimation(true);
      }, 8500);
    }
  }, [selectedFace]);
  const handleSubmit = async (e) => {
    if (!isGreen ? user.credits <= 0 : user.greenCredits <= 0) {
      toast.error(
        `You don't have enough ${isGreen ? "green" : "purple"} credits to play`
      );
      router.push("/shop");
      return;
    }
    setMessages((prev) => [
      ...prev,
      {
        text: query,
        isUser: true,
      },
    ]);

    setRollDice(true);
  };

  useEffect(() => {
    if (rollDice) setOpen(true);
  }, [rollDice]);
  const handlePlayAudio = () => {
    setShowMenu(false);
    setPlayAudio(true);
  };

  const handleSaveGame = async () => {
    setShowMenu(false);
    try {
      if (!isGreen ? user.credits <= 0 : user.greenCredits <= 0) {
        toast.error(
          `You don't have enough ${
            isGreen ? "green" : "purple"
          } credits to play`
        );
        router.push("/shop");
        return;
      }
      const bodyData = {
        conversationIndex,
        isGreen,
      };

      setIsLoading(true);
      const data = await saveGame(bodyData, user.token);
      setCredits(data.credits);
      setGreenCredits(data.greenCredits);
      toast.success("Game saved successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = () => {
    setShowMenu(false);
    setOpen(true);
  };
  return (
    <div
      onKeyDown={(e) => {
        if (isLoading || query.trim() === "") return;
        if (e.key === "Enter") {
          handleSubmit();
        }
      }}
      className='text-white grid   grid-cols-12 gap-x-3  items-center  p-4 left-0 fixed bg-black w-full bottom-0'
    >
      {/* <Tooltip
        content={
          crystal === "green"
            ? "Green Gem: Use standard AI, budget-friendly and ready for action."
            : "Purple Gem: Access the smartest AI gaming for an exclusive experience."
        }
      >
        <div className='hidden sm:block col-span-2 sm:col-span-3 md:col-span-2 items-center gap-x-3 me-auto'>
          
          <Switch
            defaultChecked
            variant='classic'
            color='violet'
            className='bg-green-500 !cursor-pointer '
            onCheckedChange={(e) => {
              setCrystal(e ? "purple" : "green");
            }}
          />
          <span className='capitalize hidden sm:block md:text-base'>
            {crystal} gem
          </span>
          
        </div>
      </Tooltip> */}
      <div className='col-span-9 sm:col-span-8 md:col-span-9 lg:col-span-10 flex items-center gap-x-2'>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          type='text'
          maxLength={420}
          className='border p-2 w-full flex-1  bg-transparent rounded-lg'
          placeholder='What will you do'
        />
        <p className='text-xs text-white   mt-1  opacity-60'>
          {query.length}/420
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || query.trim() === ""}
        className=' bg-gradient-to-t mx-auto  col col-span-2 md:col-span-1 from-green-950 to-green-500 text-white px-3 z-[4] p-2 rounded-md hover:to-green-700 hover:from-green-400 transition-colors duration-300 ease-in-out anim-9 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none'
      >
        <span className='hidden md:block'>
          {isLoading ? "Generating..." : " Roll Dice"}
        </span>
        <img src='/Icons/d20.png' alt='dice' className='w-6 h-6 md:hidden' />
      </button>

      <div className=' col-span-1 sm:col-span-2 lg:col-span-1 flex items-center justify-end gap-x-2'>
        <Tooltip content={"Use a purple gem to visualize your adventure"}>
          <button
            onClick={handleGenerateImage}
            disabled={isLoading || !visualText}
            className='cursor-pointer bg-purple-500 text-black h-10 w-10  border-0 transition-all rounded-full disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed hidden sm:inline-flex items-center justify-center'
          >
            <Image color='#fff' size={20} />
          </button>
        </Tooltip>
        <div className='  flex items-center justify-end gap-x-2'>
          <Popover.Root open={showMenu} onOpenChange={(e) => setShowMenu(e)}>
            <Popover.Trigger>
              <MoreVertical className='cursor-pointer' />
            </Popover.Trigger>
            <Popover.Content style={{ width: 150, padding: 0 }}>
              <div>
                <Tooltip content='Let AI Narrate your Game'>
                  <button
                    onClick={handlePlayAudio}
                    disabled={playAudio || isLoading}
                    className='cursor-pointer w-full bg-white  focus:border-0  focus:!outline-none focus-within:border-0 text-black flex items-center justify-center  gap-x-2 transition-all py-3 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed '
                  >
                    <AudioLines size={20} strokeWidth={1.3} /> Narrate
                  </button>
                </Tooltip>
                <Tooltip content='Be cautious, as the game will automatically save your progress every 4-5 turns. You can use one purple gem to save your game'>
                  <button
                    onClick={handleSaveGame}
                    disabled={isLoading}
                    className='focus:border-0  focus:!outline-none focus-within:border-0 cursor-pointer w-full bg-white text-black flex items-center justify-center  gap-x-2 transition-all py-3 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed '
                  >
                    <Save size={20} strokeWidth={1.3} /> Save
                  </button>
                </Tooltip>
                <Tooltip
                  content={"Use a purple gem to visualize your adventure"}
                >
                  <button
                    onClick={handleGenerateImage}
                    disabled={isLoading || !visualText}
                    className='focus:border-0  focus:!outline-none focus-within:border-0 cursor-pointer w-full bg-white text-black flex items-center justify-center  gap-x-2 transition-all py-3 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed '
                  >
                    <Image size={20} strokeWidth={1.3} /> Generate
                  </button>
                </Tooltip>
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
      <GameLoop
        open={open}
        setOpen={setOpen}
        visualText={visualText}
        rollDice={rollDice}
        selectedFace={selectedFace}
        setSelectedFace={setSelectedFace}
        loading={isLoadingAnimation}
        setLoading={setIsLoadingAnimation}
      />
    </div>
  );
}
