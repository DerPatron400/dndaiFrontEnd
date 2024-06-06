"use client";
import React, { useEffect, useState } from "react";
// import Create from "@/components/character/createCharacter/create";
// import useStepperStore from "@/utils/characterStore";
// import { STEP_NAMES } from "./constants";
// import { INITIAL_CHARACTER } from "./constants";
// import ImageModal from "./shared/ImageModal";
// import BottomMenu from "./BottomMenu";
import { cn } from "@/lib/utils";
import Create from "@/components/campaigns/createCampaign/create";
import CustomButton from "@/components/ui/custom-button";

export default function Index() {
  //   const { activeStep, showModal } = useStepperStore();

  //   const [character, setCharacter] = useState(INITIAL_CHARACTER);

  //   useEffect(() => {
  //     //height 100 vh and not scrollable when show modal
  //     if (showModal) {
  //       document.body.style.overflow = "hidden";
  //     }

  //     return () => {
  //       document.body.style.overflowY = "auto";
  //     };
  //   }, [showModal]);
  return (
    <div className="h-screen w-full flex flex-col bg-gradient pt-[172px] md:pt-[120px] px-6 lg:px-12 md:pb-64 ">
      {/* <ImageModal /> */}
      {/* Desktop */}
      <div className="hidden md:flex flex-col gap-2.5 ">
        <h1 className="text-center flex justify-start text-white headline-3 z-[10] ">
          Create your own campaign
        </h1>
      </div>
      <div
        className={
          "flex flex-col gap-2.5 bg-blur-bottom-menu z-[12] w-screen left-0 h-[198px] px-5 pb-4 md:hidden fixed top-0 justify-end"
        }
      >
        <h1 className="text-center flex justify-start text-white headline-3 z-[10] ">
          Create your own campaign
        </h1>
      </div>
      <div className="w-full h-[62vh] flex z-[10] ">
        <Create />
      </div>
      <div className="flex justify-end items-end mt-5">
        <CustomButton variant={"primary"} className={"w-1/5"}>
          <img src="/Icons/Add.svg" alt="" className="h-5 w-5 opacity-75" />
          Create campaign ( <img src="/gems/Legendary.png" alt="" /> 1)
        </CustomButton>
      </div>
    </div>
  );
}
