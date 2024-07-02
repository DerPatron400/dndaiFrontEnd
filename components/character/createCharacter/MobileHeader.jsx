import React from "react";
import { STEP_NAMES } from "./constants";
import useStepperStore from "@/utils/characterStore";
export default function MobileHeader() {
  const { activeStep } = useStepperStore();
  return (
    <div
      className={
        "flex flex-col gap-2.5 bg-blur-bottom-menu  z-[12] w-screen  fixed h-[144px] top-0 left-0 px-5 pb-4  md:hidden   justify-end"
      }
    >
      <h1 className='text-center flex justify-start text-white headline-3 z-[10] '>
        Create your character
      </h1>
      <div className=' headline-4   w-full z-[10] md:hidden'>
        <span className='text-gray2'>Step {activeStep + 1}/9</span>
        <span className='text-white'> {STEP_NAMES[activeStep]}</span>
      </div>
    </div>
  );
}
