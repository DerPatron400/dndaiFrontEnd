import React from "react";
import CharacterInfo from "@/components/myCharacter/characterInfo";
import AbilitiesInfo from "@/components/myCharacter/abilitiesInfo";
import GeneralInfo from "@/components/myCharacter/general";
import CustomButton from "../ui/custom-button";
import { Play, Download } from "lucide-react";

export default function characterSheet() {
  return (
    <div className="h-full min-h-screen w-screen py-[137px] px-[64px] flex flex-col gap-[24px]">
      <div className="flex justify-start gap-[32px]">
        <CustomButton variant={"primary"}>
          <Play size={15} />
          Play with characters
        </CustomButton>
        <CustomButton
          className={
            "border border-none bg-transparent p-0 hover:bg-transparent active:bg-transparent active:text-gray2"
          }
        >
          <Play size={15} className="text-gray2" />
          Change character portrait
        </CustomButton>
        <CustomButton
          className={
            "border border-none bg-transparent p-0 hover:bg-transparent active:bg-transparent active:text-gray2"
          }
        >
          <Download size={15} className="text-gray2" />
          Download character sheet
        </CustomButton>
      </div>
      <div className=" h-full flex gap-[24px] ">
        <div className="w-[414px] relative">
          <CharacterInfo />
        </div>
        <div className=" w-auto gap-[24px] flex flex-col">
          <GeneralInfo />
        </div>
        <div className=" w-[403px]  flex flex-col gap-[24px]">
          <AbilitiesInfo />
        </div>
      </div>
    </div>
  );
}
