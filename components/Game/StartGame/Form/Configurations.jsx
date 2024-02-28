import React, { useState } from "react";
import {
  Dialog,
  Flex,
  TextField,
  Button,
  Text,
  Select,
  Tooltip,
} from "@radix-ui/themes";
import { Info } from "lucide-react";
import useUserStore from "@/utils/store/userStore";
import useGameStore from "@/utils/store/introTextStore";
import { newGame } from "@/api/game";
import { useRouter } from "next/navigation";

export default function Configurations({
  open,
  setOpen,
  formData,
  setIsLoading,
}) {
  const router = useRouter();
  const [selectedCrystal, setSelectedCrystal] = useState("purple");
  const [avatar, setAvatar] = useState("unique");
  const { user, setCredits, setGreenCredits } = useUserStore((state) => state);
  const { setIntroText, setCharacter, setChatAvatar, setImage } = useGameStore(
    (state) => state
  );

  const handleStart = async () => {
    setIsLoading(true);
    setOpen(false);

    const bodyData = {
      strength: formData.strength,
      who: formData.name,
      constitution: formData.constitution,
      intelligence: formData.intelligence,
      wisdom: formData.wisdom,
      charisma: formData.charisma,
      dexterity: formData.dexterity,
      styleArt: "dnd",
      dndClasses: formData.class,
      dndRace: formData.race,
      isGreen: selectedCrystal === "green",
      uniqueAvatar: avatar === "unique",
    };

    if (selectedCrystal === "green" && user.greenCredits <= 0) {
      setOpen(false);
      toast.error("You don't have enough green gems to play");
      return;
    } else if (selectedCrystal === "purple" && user.credits <= 0) {
      setOpen(false);
      toast.error("You don't have enough purple gems to play");
      router.push("/shop");
      return;
    }

    try {
      const data = await newGame(bodyData, user.token);
      setIntroText(data.responseText);
      setCharacter(data.character);

      setCredits(data.credits.purple);
      setGreenCredits(data.credits.green);
      setChatAvatar(data.avatar);
      setImage(null);

      console.log(data.avatar);

      router.push("/game/classic?conversationIndex=" + data.conversationIndex);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Dialog.Root
      open={open}
      className='!bg-black'
      onOpenChange={(e) => {
        setOpen(e);
      }}
    >
      <Dialog.Content
        className='!bg-black !py-10 !border-green-500 !border text-white'
        style={{ maxWidth: 500, backgroundColor: "#000" }}
      >
        <Dialog.Title>Game Configurations</Dialog.Title>

        <Flex direction='column' gap='5' className='mt-9'>
          <label className='grid grid-cols-8  items-center '>
            <span className='col-span-2 text-lg'>Game Gem</span>
            <div className='flex col-span-6 items-center gap-x-4 custom-select'>
              <Select.Root
                onValueChange={(e) => {
                  setSelectedCrystal(e);
                }}
                value={selectedCrystal}
              >
                <Select.Trigger
                  //change border color

                  className='w-[90%] !h-12 !border-green-500 !border  !text-white  !bg-transparent'
                />
                <Select.Content className='!text-white  !bg-black'>
                  <Select.Item value='purple'>Purple</Select.Item>
                  <Select.Item value='green'>Green</Select.Item>
                </Select.Content>
              </Select.Root>
              <Tooltip
                content={
                  selectedCrystal === "green"
                    ? "Green Gem: Dive into instant play with standard AI, budget-friendly and ready for action."
                    : "Purple Gem: Access the smartest AI gaming for an exclusive experience."
                }
              >
                <Info className='cursor-pointer' strokeWidth={1.5} />
              </Tooltip>
            </div>
          </label>
          <label className='grid grid-cols-8 items-center'>
            <span className='col-span-2 text-lg'>Avatar</span>
            <div className='flex col-span-6 items-center gap-x-4'>
              <Select.Root
                onValueChange={(e) => {
                  setAvatar(e);
                }}
                value={avatar}
              >
                <Select.Trigger className='w-[90%] !h-12 !text-white !bg-transparent' />
                <Select.Content className='!text-white  !bg-black'>
                  <Select.Item value='unique'>Unique</Select.Item>
                  <Select.Item value='general'>General</Select.Item>
                </Select.Content>
              </Select.Root>
              <Tooltip
                content={
                  avatar === "unique"
                    ? "Uses one Purple Gem to generate a unique avatar for you."
                    : "Uses pre-generated avatars for instant play."
                }
              >
                <Info className='cursor-pointer' strokeWidth={1.5} />
              </Tooltip>
            </div>
          </label>
        </Flex>

        <Flex gap='3' mt='4' justify='end'>
          <Dialog.Close>
            <button
              onClick={handleStart}
              className='bg-gradient-to-t from-green-950 to-green-500 text-white px-4 z-[4] py-2 rounded-md hover:to-green-700 hover:from-green-400 transition-colors duration-300 ease-in-out anim-9'
            >
              Start
            </button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
