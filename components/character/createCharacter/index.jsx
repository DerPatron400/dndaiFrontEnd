"use client";
import React, { useState } from "react";
import Create from "@/components/character/createCharacter/create";
import useStepperStore from "@/utils/characterStore";
import { STEP_NAMES } from "./constants";

import { INITIAL_CHARACTER } from "./constants";

import BottomMenu from "./BottomMenu";

export default function Index() {
  const { activeStep } = useStepperStore();

  const [character, setCharacter] = useState(INITIAL_CHARACTER);

  return (
    <div className='h-full min-h-screen w-screen flex flex-col bg-gradient pt-32 px-6 lg:px-12'>
      <div className='flex flex-col gap-2.5'>
        <h1 className='text-center flex justify-start text-white headline-3  '>
          Create your character
        </h1>
        <div className=' headline-4   w-full md:hidden'>
          <span className='text-gray2'>Step {activeStep + 1}/9</span>
          <span className='text-white'> {STEP_NAMES[activeStep]}</span>
        </div>
      </div>
      <div className='w-full flex '>
        <Create setCharacter={setCharacter} character={character} />
      </div>
      <BottomMenu setCharacter={setCharacter} character={character} />
    </div>
  );
}
