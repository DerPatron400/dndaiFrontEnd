"use client";
import React, { useEffect, useState } from "react";
import Create from "@/components/character/createCharacter/create";
import useStepperStore from "@/utils/characterStore";
import { STEP_NAMES } from "./constants";
import { INITIAL_CHARACTER } from "./constants";
import ImageModal from "./shared/ImageModal";
import BottomMenu from "./BottomMenu";
import { cn } from "@/lib/utils";

export default function Index() {
  const { activeStep, showModal } = useStepperStore();

  const [character, setCharacter] = useState(INITIAL_CHARACTER);

  useEffect(() => {
    //height 100 vh and not scrollable when show modal
    if (showModal) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showModal]);
  return (
    <div className="h-full  border border-green-400 w-full flex flex-col bg-gradient pt-[160px] md:pt-[120px] px-6 lg:px-12 ">
      <ImageModal />
      {/* Desktop */}
      <div className="hidden md:flex flex-col gap-2.5 ">
        <h1 className="text-center flex justify-start text-white headline-3 z-[10] ">
          Create your character
        </h1>
      </div>
      {/* Mobile */}
      <div
        className={
          "flex flex-col gap-2.5 bg-blur-bottom-menu z-[12] w-screen left-0 h-[180px] px-5 pb-4 md:hidden fixed top-0 justify-end"
        }
      >
        <h1 className="text-center flex justify-start text-white headline-3 z-[10] ">
          Create your character
        </h1>
        <div className=" headline-4   w-full z-[10] md:hidden">
          <span className="text-gray2">Step {activeStep + 1}/9</span>
          <span className="text-white"> {STEP_NAMES[activeStep]}</span>
        </div>
      </div>
      <div className="w-full flex z-[10] h-full   ">
        <Create setCharacter={setCharacter} character={character} />
      </div>
      <BottomMenu setCharacter={setCharacter} character={character} />
    </div>
  );
}
