// create.js
"use client";
import React, { useState } from "react";
import useStepperStore from "@/utils/characterStore";
import Race from "@/components/character/createCharacter/Race/index";
import Class from "@/components/character/createCharacter/Class/index";
import Abilities from "@/components/character/createCharacter/Abilities/index";
import Background from "@/components/character/createCharacter/Background/index";
import Personality from "@/components/character/createCharacter/Personality/index";
import Alignment from "@/components/character/createCharacter/Alignment/index";
import Equipment from "@/components/character/createCharacter/Equipment/index";
import Gold from "@/components/character/createCharacter/Gold/index";
import CharacterName from "@/components/character/createCharacter/CharacterName/index";
import Stepper from "./stepper";
import ImageModal from "./shared/ImageModal";

export default function create({ character, setCharacter }) {
  const { activeStep } = useStepperStore();

  // Map each step to its corresponding component
  const stepComponents = [
    <Race setCharacter={setCharacter} character={character} />,
    <Class setCharacter={setCharacter} character={character} />,
    <Abilities setCharacter={setCharacter} character={character} />,
    <Background setCharacter={setCharacter} character={character} />,
    <Personality setCharacter={setCharacter} character={character} />,
    <Alignment setCharacter={setCharacter} character={character} />,
    <Equipment setCharacter={setCharacter} character={character} />,
    <Gold setCharacter={setCharacter} character={character} />,
    <CharacterName setCharacter={setCharacter} character={character} />,
  ];

  return (
    <div className='w-full  flex flex-col md:flex-row  pt-8'>
      <ImageModal />
      <div className='text-white w-auto   h-auto '>
        <Stepper />
      </div>

      <div className='md:ms-24 h-full w-full  '>
        {/* Render the component based on the active step */}
        {stepComponents[activeStep]}
      </div>
    </div>
  );
}
