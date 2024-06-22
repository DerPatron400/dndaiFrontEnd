"use client";
import React, { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import CustomButton from "@/components/ui/custom-button";

export default function StepDialog() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => (prevStep < 2 ? prevStep + 1 : prevStep));
  };

  const handleCancel = () => {
    // Reset to the initial step or perform any cancel action
    setStep(1);
  };

  return (
    <DialogContent className="bg-white/[8%] text-white border border-white/10">
      {step === 1 && (
        <>
          <div className="flex flex-col gap-2">
            <span className="running-text-mono text-irisPurpleLight">
              STEP 1/2
            </span>
            <span className="running-text-large">
              Select the image type you want to generate
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-white/10 overflow-auto hide-scrollbar max-h-[50vh]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <img
                  src="/images/CreateCharacter/CharacterName/CharacterName.png"
                  className="w-full h-[107px] md:h-[223px] md:w-[223px] ease-animate object-cover rounded-[10px] border-2 border-irisPurpleLight"
                />
                <span className="description">Name</span>
              </div>
            ))}
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="flex flex-col gap-2">
            <span className="running-text-mono text-irisPurpleLight">
              STEP 2/2
            </span>
            <span className="running-text-large">
              Select an art style you want to use
            </span>
            {/* Add your step 2 content here */}
          </div>
          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-white/10 overflow-auto hide-scrollbar max-h-[50vh]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <img
                  src="/images/CreateCharacter/CharacterName/CharacterName.png"
                  className="w-full h-[107px] md:h-[223px] md:w-[223px] ease-animate object-cover rounded-[10px] border-2 border-irisPurpleLight"
                />
                <span className="description">Name</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex justify-end gap-4 pt-2">
        <CustomButton withIcon onClick={handleCancel}>
          <img src="/Icons/Cancel.svg" alt="" className="w-6 h-6 opacity-70" />
          <span className="running-text-mono text-white">CANCEL</span>
        </CustomButton>
        <CustomButton withIcon variant={"primary"} onClick={handleNextStep}>
          <span className="running-text-mono text-black">
            {step === 1 ? "NEXT STEP" : "GENERATE"}
          </span>
          {step === 1 ? (
            <img
              src="/Icons/ArrowRight.svg"
              alt=""
              className="w-6 h-6 opacity-70"
            />
          ) : (
            <>
              (<img src="/gems/Legendary.png" alt="" /> 1)
            </>
          )}
        </CustomButton>
      </div>
    </DialogContent>
  );
}
