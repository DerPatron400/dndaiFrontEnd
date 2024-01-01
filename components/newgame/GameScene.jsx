// AtmosScene.js
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Experience from "./Experience";
import GameLoop from "@/components/shared/GameLoop";
import { parseGameText } from "@/utils/parseText";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import useIntroTextStore from "@/utils/store/introTextStore";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const responseText =
  "Welcome to the adventure, Dol Katzius, the Halfling Barbarian!\n" +
  "\n" +
  "Firstly, let's establish your character's starting Hit Points (HP) and Armor Class (AC). As a Barbarian, you start with 12 HP plus your Constitution modifier. With a Constitution of 12, your modifier is +1. So, you begin with 13 HP.\n" +
  "\n" +
  "Your AC is determined by your equipment and Dexterity modifier. Without armor, a Barbarian's AC is 10 + Dexterity modifier. With a Dexterity of 14, your modifier is +2, making your unarmored AC 12. If you choose to wear light armor, it could increase depending on the type of armor.\n" +
  "\n" +
  "As a Barbarian, you have the class-specific feature Rage, which you can use twice per long rest at 1st level. While raging, you have advantage on Strength checks and saving throws, you gain a bonus to the damage roll that increases as you level up, and you have resistance to bludgeoning, piercing, and slashing damage.\n" +
  "\n" +
  "For skills, you can choose two from the following list: Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival.\n" +
  "\n" +
  "Now, let's begin your adventure. \n" +
  "\n" +
  "---\n" +
  "\n" +
  "**The Quest of the Silver Chalice:**\n" +
  "\n" +
  "You find yourself in the cozy village of Thistlebrook, nestled in the rolling green hills of the Halfling homelands. Rumors speak of a Silver Chalice, said to be an ancient relic of your people, recently uncovered in the ruins of an old keep deep within the Whispering Woods.\n" +
  "\n" +
  "**Path 1: The Whispering Woods:**\n" +
  "Venture into the dense forest to seek the Silver Chalice. The woods are said to be enchanted and home to mischievous fey and lurking beasts.\n" +
  "\n" +
  "**Path 2: The Village Elders:**\n" +
  "Seek wisdom from the village elders about the Silver Chalice and its last known location. They may have useful knowledge or require you to perform tasks for the village before they share their secrets.\n" +
  "\n" +
  "**Path 3: The Traveling Merchant:**\n" +
  "A peculiar merchant has set up a stall in the village market, claiming to have artifacts that could aid in your quest. Perhaps there's something of use among his wares, or maybe he's looking for a strong adventurer to hire.\n" +
  "\n" +
  "**Free-Choice Path:**\n" +
  "Dol Katzius, you are free to pursue any course of action—whether that's gathering more information in the tavern, training to sharpen your battle skills, or setting out on an entirely different quest that piques your interest.\n" +
  "\n" +
  "---\n" +
  "\n" +
  "**VISUAL:** Thistlebrook is a quaint village with thatched cottages, bustling with Halflings preparing for the upcoming harvest festival. The scent of fresh bread wafts through the air.\n" +
  "\n" +
  "What do you choose to do, Dol Katzius?";

export default function AtmosScene() {
  const { introText, image } = useIntroTextStore((state) => state);
  const [pages, setPages] = useState(1);
  console.log(introText);
  const { visualText, resultArray } = parseGameText(introText);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("text");
  const [isForwardPressed, setIsForwardPressed] = useState(false);
  const [isBackwardPressed, setIsBackwardPressed] = useState(false);

  const addToScene = (type) => {
    setPages((prev) => prev + 1);
  };

  return (
    <div className='relative'>
      <div className='fixed top-0 border left-0 h-[100vh] w-screen'>
        <Canvas>
          <color attach='background' args={["#ececec"]} />

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
      />

      <div className='fixed bottom-10 left-0 w-screen h-[10vh] items-center gap-x-2 px-4 flex md:hidden'>
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
          className='bg-white text-black px-4 py-2 rounded-md'
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
          className='bg-white text-black px-4 py-2 rounded-md'
        >
          <FaChevronDown size={20} />
        </button>
      </div>
    </div>
  );
}
