"use client";
import React, { useEffect, useState } from "react";
import Create from "@/components/character/createCharacter/create";
import useStepperStore from "@/utils/characterStore";

import { INITIAL_CHARACTER } from "./constants";
import ImageModal from "./shared/ImageModal";
import BottomMenu from "./BottomMenu";

export default function Index() {
  const { activeStep, showModal } = useStepperStore();

  const [character, setCharacter] = useState(INITIAL_CHARACTER);

  useEffect(() => {
    //height 100 vh and not scrollable when show modal
    if (showModal) {
      document.body.style.overflowY = "hidden ";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showModal]);
  return (
    <div className='h-full md:h-screen md:max-h-screen box-border  w-full flex flex-col bg-gradient pt-[136px] md:pt-[120px] px-6 lg:px-12  '>
      <ImageModal />
      {/* Desktop */}
      <div className='hidden md:flex flex-col gap-2.5 '>
        <h1 className='text-center flex justify-start text-white headline-3 z-[10] '>
          Create your character
        </h1>
      </div>

      <div className='w-full flex z-[10] h-1/2 flex-1   '>
        <Create setCharacter={setCharacter} character={character} />
      </div>
      <BottomMenu setCharacter={setCharacter} character={character} />
    </div>
  );
}
